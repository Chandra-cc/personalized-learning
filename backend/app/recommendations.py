from .models import User, StepProgress, UserPreferences
from .learning_paths import learning_path_templates
from sqlalchemy import func
import json
from collections import Counter

def calculate_user_interests(user_id):
    """Calculate user interests based on completed steps and performance."""
    print(f"\n=== Calculating interests for user {user_id} ===")
    
    # Get user's completed steps
    completed_steps = StepProgress.query.filter_by(
        user_id=user_id
    ).filter(StepProgress.completed_at.isnot(None)).all()
    
    print(f"Found {len(completed_steps)} completed steps")
    
    # Get user preferences
    preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    print(f"User preferences found: {bool(preferences)}")
    
    # Get user's current path
    user = User.query.get(user_id)
    current_path = []
    try:
        if user.learning_path:
            current_path = json.loads(user.learning_path)
    except json.JSONDecodeError:
        print("Error decoding user's learning path")
    
    # Initialize interests
    interests = Counter()
    
    # Add interests from completed steps
    for step in completed_steps:
        print(f"\nProcessing step {step.step_index}")
        if step.step_index < len(current_path):
            step_details = current_path[step.step_index]
            print(f"Step details: {json.dumps(step_details, indent=2)}")
            # Add weight based on performance
            weight = 1.0
            if step.comprehension_score and step.comprehension_score > 80:
                weight = 1.5
            # Add skills to interests with weight
            for skill in step_details.get('skills_gained', []):
                interests[skill] += weight
                print(f"Added skill {skill} with weight {weight}")
    
    # Add interests from user preferences
    if preferences and preferences.interests:
        try:
            user_interests = json.loads(preferences.interests)
            print(f"\nAdding user preferences: {user_interests}")
            for interest in user_interests:
                interests[interest] += 2  # Give more weight to explicit interests
                print(f"Added interest {interest} with weight 2")
        except json.JSONDecodeError:
            print("Error decoding user preferences")
    
    print(f"\nFinal interests: {dict(interests)}")
    return interests

def find_related_paths(interests, current_goal):
    """Find learning paths related to user's interests."""
    print("\n=== Finding related paths ===")
    print(f"Current goal: {current_goal}")
    path_scores = {}
    
    for path_name, path_steps in learning_path_templates.items():
        if path_name == current_goal:
            continue  # Skip current path
            
        score = 0
        path_skills = set()
        
        # Collect all skills in the path
        for step in path_steps:
            path_skills.update(step.get('skills_gained', []))
        
        print(f"\nChecking path: {path_name}")
        print(f"Path skills: {path_skills}")
            
        # Calculate score based on matching skills
        for skill in path_skills:
            if skill in interests:
                score += interests[skill]
                print(f"Matched skill {skill} with score {interests[skill]}")
                
        if score > 0:
            path_scores[path_name] = score
            print(f"Total score for {path_name}: {score}")
            
    sorted_paths = sorted(path_scores.items(), key=lambda x: x[1], reverse=True)
    print(f"\nSorted paths: {sorted_paths}")
    return sorted_paths

def get_next_steps(user_id):
    """Get personalized next step recommendations for the user."""
    print(f"\n=== Getting recommendations for user {user_id} ===")
    user = User.query.get(user_id)
    if not user:
        print("User not found")
        return []
        
    # Get current progress and path
    try:
        progress = json.loads(user.progress or "{}")
        current_path = json.loads(user.learning_path or "[]")
        print(f"Current progress: {progress}")
        print(f"Current path length: {len(current_path)}")
    except json.JSONDecodeError:
        print("Error decoding user data")
        return []
    
    recommendations = []
    
    # 1. First, recommend uncompleted steps in current path
    for i, step in enumerate(current_path):
        if str(i) not in progress or not progress[str(i)]:
            print(f"Adding uncompleted step {i} to recommendations")
            recommendations.append({
                "type": "current_path",
                "step": step,
                "reason": "Next step in your current learning path"
            })
            break  # Only add the next immediate step
            
    # 2. Calculate interests and find related paths
    interests = calculate_user_interests(user_id)
    if interests:
        related_paths = find_related_paths(interests, user.goal)
        
        # 3. Add recommendations from related paths
        for path_name, score in related_paths[:2]:  # Top 2 related paths
            print(f"Adding related path {path_name} with score {score}")
            path_steps = learning_path_templates[path_name]
            if path_steps:
                top_matching_skills = [
                    skill for skill, _ in interests.most_common(2)
                    if any(skill in step.get('skills_gained', []) for step in path_steps)
                ]
                reason = (
                    f"Based on your proficiency in {' and '.join(top_matching_skills)}"
                    if top_matching_skills
                    else "Based on your learning interests"
                )
                recommendations.append({
                    "type": "related_path",
                    "path_name": path_name,
                    "first_step": path_steps[0],
                    "reason": reason
                })
    
    print(f"\nFinal recommendations: {json.dumps(recommendations, indent=2)}")
    return recommendations

def get_learning_insights(user_id):
    """Get insights about user's learning patterns and progress."""
    # Get user's completed steps
    completed_steps = StepProgress.query.filter_by(
        user_id=user_id,
        completed_at__isnot=None
    ).all()
    
    if not completed_steps:
        return {}
        
    # Calculate average completion time
    avg_completion_time = func.avg(StepProgress.time_spent).scalar() or 0
    
    # Find best performing areas
    performance_by_skill = Counter()
    for step in completed_steps:
        if step.comprehension_score:
            user = User.query.get(user_id)
            learning_path = json.loads(user.learning_path or "[]")
            if step.step_index < len(learning_path):
                step_details = learning_path[step.step_index]
                for skill in step_details.get('skills_gained', []):
                    performance_by_skill[skill] += step.comprehension_score
                    
    # Get top performing skills
    top_skills = performance_by_skill.most_common(3)
    
    # Calculate learning velocity (steps completed per week)
    first_step = min(completed_steps, key=lambda x: x.started_at)
    last_step = max(completed_steps, key=lambda x: x.completed_at)
    weeks_spent = (last_step.completed_at - first_step.started_at).days / 7
    velocity = len(completed_steps) / weeks_spent if weeks_spent > 0 else 0
    
    return {
        "avg_completion_time": avg_completion_time,
        "top_performing_skills": top_skills,
        "learning_velocity": velocity,
        "total_steps_completed": len(completed_steps)
    } 