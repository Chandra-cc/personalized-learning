from flask import Blueprint, request, jsonify
from .models import User, StepProgress, LearningAnalytics, UserPreferences, db
from .learning_paths import learning_path_templates
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime, timedelta
from sqlalchemy import func
from .recommendations import get_next_steps, get_learning_insights

main = Blueprint('main', __name__)

from fuzzywuzzy import process

def get_closest_goal(user_input, available_goals):
    match, score = process.extractOne(user_input, available_goals)
    return match if score > 65 else None

def generate_learning_path(goal, user_preferences=None):
    all_goals = list(learning_path_templates.keys())
    matched_goal = get_closest_goal(goal, all_goals)
    
    if not matched_goal:
        return []
        
    base_path = learning_path_templates.get(matched_goal, [])
    
    # If we have user preferences, customize the path
    if user_preferences:
        # Adjust content based on difficulty preference
        if user_preferences.difficulty_preference == "beginner":
            for step in base_path:
                step["duration"] = str(int(step["duration"].split()[0]) * 1.5) + " weeks"
        elif user_preferences.difficulty_preference == "advanced":
            for step in base_path:
                step["duration"] = str(max(1, int(step["duration"].split()[0]) // 1.5)) + " weeks"
                
        # Add additional resources based on learning style
        for step in base_path:
            if user_preferences.learning_style == "visual":
                step["additional_resources"] = {"type": "video", "url": f"https://video-course.com/{step['title']}"}
            elif user_preferences.learning_style == "practical":
                step["additional_resources"] = {"type": "project", "url": f"https://projects.com/{step['title']}"}
                
    return base_path

# ----------------- AUTH -----------------

@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(email=email, password_hash=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful", "user_id": new_user.id})


@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id})

# ----------------- USER PROFILE -----------------

@main.route('/submit-user-data', methods=['POST'])
def submit_user_data():
    data = request.get_json()
    user_id = data.get('user_id')
    age = data.get('age')
    gender = data.get('gender')
    education = data.get('education')
    goal = data.get('goal')
    
    if not all([age, gender, education, goal]):
        return jsonify({"message": "Missing fields"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Get or create user preferences
    preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    if not preferences:
        preferences = UserPreferences(user_id=user_id)
        db.session.add(preferences)
    
    # Generate learning path with preferences
    learning_path = generate_learning_path(goal, preferences)
    
    # Update user data
    user.age = age
    user.gender = gender
    user.education = education
    user.goal = goal
    user.learning_path = json.dumps(learning_path)
    
    # Initialize step progress for each step
    for idx, _ in enumerate(learning_path):
        step_progress = StepProgress(
            user_id=user_id,
            step_index=idx,
            started_at=datetime.utcnow()
        )
        db.session.add(step_progress)
    
    # Initialize learning analytics
    analytics = LearningAnalytics(
        user_id=user_id,
        date=datetime.utcnow().date()
    )
    db.session.add(analytics)
    
    db.session.commit()

    return jsonify({
        "message": "User data submitted successfully",
        "learning_path": learning_path
    })

@main.route('/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    try:
        print(f"\n=== Getting user data for user {user_id} ===")
        user = User.query.get(user_id)
        if not user:
            print(f"User {user_id} not found")
            return jsonify({"error": "User not found", "message": "Unable to find user with the provided ID"}), 404

        print(f"Raw user progress: {user.progress}")
        
        # Get user preferences
        preferences = UserPreferences.query.filter_by(user_id=user_id).first()
        print(f"User preferences found: {bool(preferences)}")
        
        # Get analytics
        analytics = LearningAnalytics.query.filter_by(user_id=user_id).order_by(LearningAnalytics.date.desc()).first()
        print(f"Analytics found: {bool(analytics)}")
        
        # Get detailed progress
        step_progress_entries = StepProgress.query.filter_by(user_id=user_id).all()
        print(f"Found {len(step_progress_entries)} step progress entries")
        
        # Initialize progress from the database
        try:
            progress = json.loads(user.progress or "{}")
        except json.JSONDecodeError as e:
            print(f"Error decoding user progress: {user.progress}")
            print(f"JSON decode error: {str(e)}")
            progress = {}

        # Build detailed progress from StepProgress entries
        detailed_progress = {}
        for sp in step_progress_entries:
            if sp.completed_at:  # Only include completed steps
                step_index = str(sp.step_index)
                detailed_progress[step_index] = {
                    "completed": True,
                    "time_spent": sp.time_spent,
                    "resource_visits": sp.resource_visits,
                    "difficulty_rating": sp.difficulty_rating,
                    "comprehension_score": sp.comprehension_score,
                    "notes": sp.notes,
                    "completed_at": sp.completed_at.isoformat()
                }
                # Ensure the step is marked as completed in the progress field
                progress[step_index] = True

        # Update user's progress if it changed
        progress_json = json.dumps(progress)
        if user.progress != progress_json:
            print("Updating user progress in database")
            try:
                user.progress = progress_json
                db.session.commit()
                print("Successfully updated user progress")
            except Exception as e:
                print(f"Error updating progress: {str(e)}")
                db.session.rollback()

        # Ensure learning_path is valid JSON
        try:
            if isinstance(user.learning_path, str):
                learning_path = json.loads(user.learning_path or "[]")
            elif isinstance(user.learning_path, (list, dict)):
                learning_path = user.learning_path
            else:
                print(f"Invalid learning_path type: {type(user.learning_path)}")
                learning_path = []
                
            # Validate learning_path structure
            if not isinstance(learning_path, list):
                print(f"Invalid learning_path structure: {learning_path}")
                learning_path = []
                
            # Update learning_path in database if it was invalid
            if not user.learning_path or user.learning_path == "null":
                user.learning_path = json.dumps(learning_path)
                db.session.commit()
                
        except json.JSONDecodeError as e:
            print(f"Error decoding learning path: {user.learning_path}")
            print(f"JSON decode error: {str(e)}")
            learning_path = []
            # Update with valid empty array
            user.learning_path = json.dumps(learning_path)
            db.session.commit()

        response_data = {
            "email": user.email,
            "age": user.age,
            "gender": user.gender,
            "education": user.education,
            "goal": user.goal,
            "learning_path": learning_path,  # This is now guaranteed to be a valid Python list
            "progress": progress,
            "detailed_progress": detailed_progress,
            "analytics": {
                "total_time_spent": analytics.total_time_spent if analytics else 0,
                "daily_streak": analytics.daily_streak if analytics else 0,
                "focus_score": analytics.focus_score if analytics else 0
            } if analytics else {},
            "preferences": {
                "learning_style": preferences.learning_style if preferences else None,
                "difficulty_preference": preferences.difficulty_preference if preferences else None,
                "daily_goal_minutes": preferences.daily_goal_minutes if preferences else None
            }
        }
        
        # Validate response data can be serialized
        try:
            json.dumps(response_data)
        except TypeError as e:
            print(f"Error serializing response data: {str(e)}")
            # Clean any non-serializable data
            response_data["learning_path"] = []
            
        print(f"Sending response: {json.dumps(response_data, indent=2)}")
        return jsonify(response_data)
        
    except Exception as e:
        print(f"Unexpected error in get_user_data: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": "Internal server error",
            "message": "An unexpected error occurred while fetching user data",
            "details": str(e)
        }), 500

# ----------------- LEARNING PATH / PROGRESS -----------------

@main.route('/update-progress/<int:user_id>', methods=['POST'])
def update_progress(user_id):
    print(f"\n=== Updating progress for user {user_id} ===")
    data = request.get_json()
    step_index = str(data.get("step_index"))  # Convert to string for consistency
    time_spent = data.get("time_spent", 0)
    difficulty_rating = data.get("difficulty_rating")
    comprehension_score = data.get("comprehension_score")
    notes = data.get("notes")

    print(f"Received data: {json.dumps(data, indent=2)}")

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    print(f"Current user progress: {user.progress}")

    # Update user's progress field
    try:
        current_progress = json.loads(user.progress or "{}")
    except json.JSONDecodeError:
        print(f"Error decoding user progress: {user.progress}")
        current_progress = {}

    # Update step progress
    step_progress = StepProgress.query.filter_by(
        user_id=user_id,
        step_index=int(step_index)
    ).first()
    
    if not step_progress:
        print(f"Creating new step progress for step {step_index}")
        step_progress = StepProgress(
            user_id=user_id,
            step_index=int(step_index),
            started_at=datetime.utcnow()
        )
        db.session.add(step_progress)
    
    # Always update the progress data
    print("Updating step progress details")
    step_progress.completed_at = datetime.utcnow()
    step_progress.time_spent = (step_progress.time_spent or 0) + time_spent
    step_progress.resource_visits = (step_progress.resource_visits or 0) + 1
    if difficulty_rating is not None:
        step_progress.difficulty_rating = difficulty_rating
    if comprehension_score is not None:
        step_progress.comprehension_score = comprehension_score
    if notes:
        step_progress.notes = notes

    # Mark as completed in the user's progress field
    current_progress[step_index] = True
    user.progress = json.dumps(current_progress)
    print(f"Updated progress: {user.progress}")

    # Update analytics
    today = datetime.utcnow().date()
    analytics = LearningAnalytics.query.filter_by(
        user_id=user_id,
        date=today
    ).first()
    
    if not analytics:
        print("Creating new analytics entry")
        yesterday = today - timedelta(days=1)
        yesterday_analytics = LearningAnalytics.query.filter_by(
            user_id=user_id,
            date=yesterday
        ).first()
        
        streak = (yesterday_analytics.daily_streak + 1) if yesterday_analytics else 1
        
        analytics = LearningAnalytics(
            user_id=user_id,
            date=today,
            daily_streak=streak
        )
        db.session.add(analytics)
    
    analytics.total_time_spent = (analytics.total_time_spent or 0) + time_spent
    analytics.steps_completed += 1
    analytics.resources_accessed += 1
    analytics.last_activity = datetime.utcnow()
    
    ideal_session_length = 25
    focus_score = min(100, (time_spent / ideal_session_length) * 100)
    analytics.focus_score = focus_score

    try:
        print("Committing changes to database")
        db.session.commit()
        print("Successfully committed changes")
    except Exception as e:
        print(f"Error committing to database: {str(e)}")
        db.session.rollback()
        return jsonify({"message": "Failed to update progress"}), 500

    # Get updated progress data
    detailed_progress = {
        step_index: {
            "completed": True,
            "time_spent": step_progress.time_spent,
            "resource_visits": step_progress.resource_visits,
            "difficulty_rating": step_progress.difficulty_rating,
            "comprehension_score": step_progress.comprehension_score,
            "notes": step_progress.notes,
            "completed_at": step_progress.completed_at.isoformat()
        }
    }

    response_data = {
        "message": "Progress updated",
        "progress": current_progress,
        "detailed_progress": detailed_progress,
        "analytics": {
            "daily_streak": analytics.daily_streak,
            "focus_score": analytics.focus_score,
            "total_time_spent": analytics.total_time_spent
        }
    }
    
    print(f"Sending response: {json.dumps(response_data, indent=2)}")
    return jsonify(response_data)

@main.route("/get-learning-path", methods=["GET"])
def get_learning_path():
    goal = request.args.get("goal")
    user_id = request.args.get("user_id")
    
    preferences = None
    if user_id:
        preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    
    path = generate_learning_path(goal, preferences)
    
    if path:
        return jsonify({"goal": goal, "learning_path": path})
    else:
        return jsonify({"message": "No path found for the given goal"}), 404

@main.route('/user-preferences/<int:user_id>', methods=['GET', 'POST'])
def handle_user_preferences(user_id):
    if request.method == 'POST':
        data = request.get_json()
        preferences = UserPreferences.query.filter_by(user_id=user_id).first()
        
        if not preferences:
            preferences = UserPreferences(user_id=user_id)
            db.session.add(preferences)
        
        # Update preferences
        preferences.preferred_learning_time = data.get('preferred_learning_time', preferences.preferred_learning_time)
        preferences.daily_goal_minutes = data.get('daily_goal_minutes', preferences.daily_goal_minutes)
        preferences.notification_preferences = json.dumps(data.get('notification_preferences', {}))
        preferences.difficulty_preference = data.get('difficulty_preference', preferences.difficulty_preference)
        preferences.learning_style = data.get('learning_style', preferences.learning_style)
        preferences.interests = json.dumps(data.get('interests', []))
        preferences.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({"message": "Preferences updated successfully"})
    
    else:  # GET
        preferences = UserPreferences.query.filter_by(user_id=user_id).first()
        if not preferences:
            return jsonify({"message": "No preferences found"}), 404
            
        return jsonify({
            "preferred_learning_time": preferences.preferred_learning_time,
            "daily_goal_minutes": preferences.daily_goal_minutes,
            "notification_preferences": json.loads(preferences.notification_preferences or "{}"),
            "difficulty_preference": preferences.difficulty_preference,
            "learning_style": preferences.learning_style,
            "interests": json.loads(preferences.interests or "[]")
        })

@main.route('/analytics/<int:user_id>', methods=['GET'])
def get_user_analytics(user_id):
    # Get date range from query params, default to last 7 days
    days = int(request.args.get('days', 7))
    end_date = datetime.utcnow().date()
    start_date = end_date - timedelta(days=days)
    
    # Get analytics for date range
    analytics = LearningAnalytics.query.filter(
        LearningAnalytics.user_id == user_id,
        LearningAnalytics.date >= start_date,
        LearningAnalytics.date <= end_date
    ).all()
    
    # Get step progress statistics
    step_progress = StepProgress.query.filter_by(user_id=user_id).all()
    
    # Calculate average difficulty and comprehension
    avg_difficulty = db.session.query(func.avg(StepProgress.difficulty_rating))\
        .filter(
            StepProgress.user_id == user_id,
            StepProgress.difficulty_rating.isnot(None)
        ).scalar() or 0
        
    avg_comprehension = db.session.query(func.avg(StepProgress.comprehension_score))\
        .filter(
            StepProgress.user_id == user_id,
            StepProgress.comprehension_score.isnot(None)
        ).scalar() or 0
    
    return jsonify({
        "daily_analytics": [{
            "date": a.date.isoformat(),
            "time_spent": a.total_time_spent,
            "steps_completed": a.steps_completed,
            "focus_score": a.focus_score
        } for a in analytics],
        "overall_stats": {
            "total_steps_completed": sum(1 for sp in step_progress if sp.completed_at),
            "total_time_spent": sum(sp.time_spent or 0 for sp in step_progress),
            "average_difficulty": round(avg_difficulty, 2),
            "average_comprehension": round(avg_comprehension, 2),
            "current_streak": analytics[-1].daily_streak if analytics else 0
        }
    })

@main.route('/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """Get personalized learning recommendations for the user."""
    recommendations = get_next_steps(user_id)
    return jsonify({
        "recommendations": recommendations
    })

@main.route('/insights/<int:user_id>', methods=['GET'])
def get_user_insights(user_id):
    """Get learning insights and patterns for the user."""
    insights = get_learning_insights(user_id)
    return jsonify(insights)
