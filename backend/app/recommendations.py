from .models import User, StepProgress, UserPreferences
from .learning_paths import learning_path_templates
from sqlalchemy import func
import json
from collections import Counter

def calculate_user_interests(user_id):
    """Calculate user interests based on completed steps and performance."""
    # Get user's completed steps
    completed_steps = StepProgress.query.filter_by(
        user_id=user_id,
        completed_at__isnot=None
    ).all()
    
    # Get user preferences
    preferences = UserPreferences.query.filter_by(user_id=user_id).first()
    
    # Initialize interests
    interests = Counter()
    
    # Add interests from completed steps
    for step in completed_steps:
        # Get the learning path and step details
        user = User.query.get(user_id)
        learning_path = json.loads(user.learning_path or "[]")
        if step.step_index < len(learning_path):
            step_details = learning_path[step.step_index]
            # Add weight based on performance
            weight = 1.0
            if step.comprehension_score and step.comprehension_score > 80:
                weight = 1.5
            # Add skills to interests with weight
            for skill in step_details.get('skills_gained', []):
                interests[skill] += weight
    
    # Add interests from user preferences
    if preferences and preferences.interests:
        user_interests = json.loads(preferences.interests)
        for interest in user_interests:
            interests[interest] += 2  # Give more weight to explicit interests
            
    return interests

def find_related_paths(interests):
    """Find learning paths related to user's interests."""
    path_scores = {}
    
    for path_name, path_steps in learning_path_templates.items():
        score = 0
        path_skills = set()
        
        # Collect all skills in the path
        for step in path_steps:
            path_skills.update(step.get('skills_gained', []))
            
        # Calculate score based on matching skills
        for skill in path_skills:
            if skill in interests:
                score += interests[skill]
                
        if score > 0:
            path_scores[path_name] = score
            
    return sorted(path_scores.items(), key=lambda x: x[1], reverse=True)

def get_next_steps(user_id):
    """Get personalized next step recommendations for the user."""
    user = User.query.get(user_id)
    if not user:
        return []
        
    # Get current progress
    progress = json.loads(user.progress or "{}")
    current_path = json.loads(user.learning_path or "[]")
    
    recommendations = []
    
    # 1. First, recommend uncompleted steps in current path
    for i, step in enumerate(current_path):
        if str(i) not in progress or not progress[str(i)]:
            recommendations.append({
                "type": "current_path",
                "step": step,
                "reason": "Continue your current learning path"
            })
            
    # 2. Calculate interests and find related paths
    interests = calculate_user_interests(user_id)
    related_paths = find_related_paths(interests)
    
    # 3. Add recommendations from related paths
    for path_name, score in related_paths[:3]:  # Top 3 related paths
        if path_name != user.goal:  # Don't recommend current path
            path_steps = learning_path_templates[path_name]
            recommendations.append({
                "type": "related_path",
                "path_name": path_name,
                "first_step": path_steps[0],
                "reason": f"Based on your interests in {', '.join(interests.keys()[:2])}"
            })
            
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