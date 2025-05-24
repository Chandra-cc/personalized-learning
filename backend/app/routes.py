from flask import Blueprint, request, jsonify
from .models import User, StepProgress, LearningAnalytics, UserPreferences, db
from .learning_paths import learning_path_templates
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime, timedelta
from sqlalchemy import func

main = Blueprint('main', __name__)

from fuzzywuzzy import process

def get_closest_goal(user_input, available_goals):
    match, score = process.extractOne(user_input, available_goals)
    return match if score > 65 else None

def generate_learning_path(goal, user_preferences=None):
    """
    Generate a learning path based on templates and user preferences.
    Now uses more user data for personalization.
    """
    all_goals = list(learning_path_templates.keys())
    matched_goal = get_closest_goal(goal, all_goals)
    
    if not matched_goal:
        return []
        
    base_path = learning_path_templates.get(matched_goal, [])
    
    if user_preferences:
        customized_path = []
        # Extract more preferences
        preferred_content_types = []
        if hasattr(user_preferences, 'preferred_content_types') and user_preferences.preferred_content_types:
            try:
                preferred_content_types = json.loads(user_preferences.preferred_content_types)
            except Exception:
                preferred_content_types = [user_preferences.preferred_content_types]
        available_hours = None
        if hasattr(user_preferences, 'available_hours_per_week'):
            try:
                available_hours = float(user_preferences.available_hours_per_week)
            except Exception:
                available_hours = None
        years_of_experience = None
        if hasattr(user_preferences, 'years_of_experience'):
            try:
                years_of_experience = float(user_preferences.years_of_experience)
            except Exception:
                years_of_experience = None
        career_goals = []
        if hasattr(user_preferences, 'career_goals') and user_preferences.career_goals:
            try:
                career_goals = json.loads(user_preferences.career_goals)
            except Exception:
                career_goals = [user_preferences.career_goals]

        for step in base_path:
            customized_step = step.copy()

            # 1. Skip beginner steps if user is experienced
            if years_of_experience is not None and years_of_experience > 2:
                if 'beginner' in str(customized_step.get('title', '')).lower() or \
                   any('beginner' in str(p.get('difficulty', '')).lower() for p in customized_step.get('projects', [])):
                    continue  # Skip this step

            # 2. Adjust duration based on difficulty and available hours
            if 'duration' in customized_step:
                duration = customized_step['duration'].split()
                if len(duration) == 2:
                    weeks = float(duration[0])
                    # Adjust for difficulty
                    if user_preferences.difficulty_preference == "beginner":
                        weeks *= 1.5
                    elif user_preferences.difficulty_preference == "advanced":
                        weeks = max(1, weeks / 1.5)
                    # Adjust for available hours
                    if available_hours is not None and available_hours < 7:
                        weeks *= 1.2
                    elif available_hours is not None and available_hours > 14:
                        weeks *= 0.8
                    customized_step['duration'] = f"{round(weeks,1)} {duration[1]}"

            # 3. Prioritize resources based on content type and learning style
            if 'resources' not in customized_step:
                customized_step['resources'] = {}
            recommended_type = None
            if preferred_content_types:
                recommended_type = preferred_content_types[0]
            elif hasattr(user_preferences, 'learning_style'):
                style = user_preferences.learning_style
                if style == "visual":
                    recommended_type = "video"
                elif style == "reading":
                    recommended_type = "documentation"
                elif style == "practical":
                    recommended_type = "practice"
            if recommended_type:
                customized_step['resources']['recommended_type'] = recommended_type

            # 4. Annotate step if it matches a career goal
            if career_goals:
                for cg in career_goals:
                    if cg.lower() in customized_step.get('title', '').lower():
                        customized_step['highlight_for_career_goal'] = True

            customized_path.append(customized_step)

        # 5. Optionally add elective step for career goals not covered
        covered_titles = [s['title'].lower() for s in customized_path]
        for cg in career_goals:
            if not any(cg.lower() in t for t in covered_titles):
                customized_path.append({
                    'title': f'Elective: {cg}',
                    'description': f'Explore resources and projects related to {cg}',
                    'duration': '1 week',
                    'resources': {},
                    'projects': [],
                    'highlight_for_career_goal': True
                })

        return customized_path
    
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
    try:
        print("\n=== Processing user data submission ===")
        data = request.json
        
        # Validate request data
        if not data:
            print("No data received")
            return jsonify({"message": "No data provided"}), 400

        user_id = data.get('user_id')
        if not user_id:
            print("No user_id provided")
            return jsonify({"message": "User ID is required"}), 400

        # Required fields validation
        required_fields = ['age', 'gender', 'goal']
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            print(f"Missing required fields: {missing_fields}")
            return jsonify({
                "message": "Missing required fields",
                "fields": missing_fields
            }), 400

        print(f"Processing data for user_id: {user_id}")
        
        # Get or create user
        user = User.query.get(user_id)
        if not user:
            print(f"User {user_id} not found")
            return jsonify({"message": "User not found"}), 404

        # Update user's basic information
        user.age = data.get('age')
        user.gender = data.get('gender')
        user.education = data.get('education')
        user.goal = data.get('goal')
        print(f"Updated user basic info: age={user.age}, gender={user.gender}, goal={user.goal}")

        # Update or create user preferences
        preferences = UserPreferences.query.filter_by(user_id=user_id).first()
        if not preferences:
            print("Creating new user preferences")
            preferences = UserPreferences(user_id=user_id)
            db.session.add(preferences)

        # Update preferences from form data
        preference_fields = [
            'learning_style', 'difficulty_preference', 'preferred_content_types',
            'preferred_session_duration', 'available_hours_per_week',
            'learning_environment', 'career_goals', 'years_of_experience'
        ]
        
        for field in preference_fields:
            if field in data:
                value = data[field]
                # Handle array fields
                if field in ['preferred_content_types', 'career_goals']:
                    value = json.dumps(value) if isinstance(value, list) else value
                setattr(preferences, field, value)
                print(f"Updated preference: {field} = {value}")

        # Generate learning path based on goal and preferences
        print(f"Generating learning path for goal: {data.get('goal')}")
        learning_path = generate_learning_path(data.get('goal'), preferences)
        if not learning_path:
            print("Failed to generate learning path")
            return jsonify({"message": "Could not generate learning path"}), 400

        # Save the learning path
        user.learning_path = json.dumps(learning_path)
        print("Learning path generated and saved")

        # Initialize or update step progress
        existing_progress = StepProgress.query.filter_by(user_id=user_id).all()
        if existing_progress:
            print("Deleting existing progress")
            for progress in existing_progress:
                db.session.delete(progress)

        print("Creating new step progress entries")
        for idx, _ in enumerate(learning_path):
            step_progress = StepProgress(
                user_id=user_id,
                step_index=idx,
                started_at=datetime.utcnow()
            )
            db.session.add(step_progress)

        # Initialize or update analytics
        analytics = LearningAnalytics.query.filter_by(
            user_id=user_id,
            date=datetime.utcnow().date()
        ).first()
        
        if not analytics:
            print("Creating new analytics entry")
            analytics = LearningAnalytics(
                user_id=user_id,
                date=datetime.utcnow().date()
            )
            db.session.add(analytics)

        try:
            print("Committing changes to database")
            db.session.commit()
            print("Successfully committed all changes")
        except Exception as e:
            print(f"Database error: {str(e)}")
            db.session.rollback()
            return jsonify({
                "message": "Database error while saving user data",
                "error": str(e)
            }), 500

        return jsonify({
            "message": "User data submitted successfully",
            "learning_path": learning_path
        })

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "message": "Server error while processing user data",
            "error": str(e)
        }), 500

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

@main.route('/get-progress/<int:user_id>', methods=['GET'])
def get_user_progress(user_id):
    try:
        # Get user's progress
        progress = StepProgress.query.filter_by(user_id=user_id).all()
        
        # Format progress data
        progress_data = []
        for p in progress:
            progress_data.append({
                'step_index': p.step_index,
                'completed': p.completed,
                'started_at': p.started_at.isoformat() if p.started_at else None,
                'completed_at': p.completed_at.isoformat() if p.completed_at else None,
                'time_spent': p.time_spent
            })
            
        return jsonify({
            'user_id': user_id,
            'progress': progress_data
        })
        
    except Exception as e:
        return jsonify({
            'message': 'Error fetching user progress',
            'error': str(e)
        }), 500

@main.route('/dashboard-recommendations/<int:user_id>', methods=['GET'])
def get_dashboard_recommendations(user_id):
    try:
        print(f"\n=== Getting dashboard recommendations for user {user_id} ===")
        
        # Get user and their learning path
        user = User.query.get(user_id)
        if not user:
            print(f"User {user_id} not found")
            return jsonify({"message": "User not found"}), 404

        try:
            learning_path = json.loads(user.learning_path or "[]")
        except json.JSONDecodeError:
            print("Error decoding learning path")
            return jsonify({"message": "Invalid learning path data"}), 500

        if not learning_path:
            print("No learning path found")
            return jsonify({"message": "No learning path available"}), 404

        # Get user's progress
        progress = StepProgress.query.filter_by(user_id=user_id).all()
        completed_steps = {p.step_index for p in progress if p.completed}
        
        # Find incomplete steps (excluding the first step)
        incomplete_steps = []
        for idx, step in enumerate(learning_path[1:], start=1):  # Start from index 1
            if idx not in completed_steps:
                step_data = step.copy()
                step_data['step_index'] = idx
                incomplete_steps.append(step_data)

        # Get 2-3 random recommendations from incomplete steps
        import random
        num_recommendations = min(random.randint(2, 3), len(incomplete_steps))
        recommendations = random.sample(incomplete_steps, num_recommendations) if incomplete_steps else []

        # Add contextual information to each recommendation
        enriched_recommendations = []
        for rec in recommendations:
            # Get the prerequisites for this step
            prerequisites = rec.get('prerequisites', [])
            prereq_completed = all(
                prereq in completed_steps 
                for idx, step in enumerate(learning_path) 
                for prereq in step.get('prerequisites', [])
                if idx in completed_steps
            )

            enriched_rec = {
                'step': rec,
                'type': 'next_step',
                'ready_to_start': prereq_completed,
                'estimated_time': rec.get('duration', 'unknown'),
                'context': {
                    'position': f"Step {rec['step_index'] + 1} of {len(learning_path)}",
                    'prerequisites_met': prereq_completed,
                    'skills_to_gain': rec.get('skills_gained', [])
                }
            }
            enriched_recommendations.append(enriched_rec)

        print(f"Generated {len(enriched_recommendations)} recommendations")
        
        return jsonify({
            'recommendations': enriched_recommendations,
            'total_steps': len(learning_path),
            'completed_steps': len(completed_steps)
        })

    except Exception as e:
        print(f"Error generating recommendations: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "message": "Error generating recommendations",
            "error": str(e)
        }), 500
