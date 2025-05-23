from . import db
from sqlalchemy.dialects.sqlite import JSON
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.String(10))
    gender = db.Column(db.String(20))
    education = db.Column(db.String(100))
    goal = db.Column(db.String(255))
    learning_path = db.Column(db.Text)  # JSON string
    progress = db.Column(db.Text)  # JSON string, e.g., {"0": true, "1": false}
    # New relationships
    step_progress = db.relationship('StepProgress', backref='user', lazy=True)
    learning_analytics = db.relationship('LearningAnalytics', backref='user', lazy=True)

class StepProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    step_index = db.Column(db.Integer, nullable=False)
    started_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    time_spent = db.Column(db.Integer)  # Time spent in minutes
    resource_visits = db.Column(db.Integer, default=0)  # Number of times resource was accessed
    notes = db.Column(db.Text)  # User notes for this step
    difficulty_rating = db.Column(db.Integer)  # User-rated difficulty (1-5)
    comprehension_score = db.Column(db.Integer)  # Self-assessed comprehension (1-100)

class LearningAnalytics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date)
    total_time_spent = db.Column(db.Integer, default=0)  # Minutes spent learning
    steps_completed = db.Column(db.Integer, default=0)
    resources_accessed = db.Column(db.Integer, default=0)
    daily_streak = db.Column(db.Integer, default=0)
    focus_score = db.Column(db.Float)  # Calculated based on session lengths and breaks
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)

class UserPreferences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    preferred_learning_time = db.Column(db.String(50))  # e.g., "morning", "evening"
    daily_goal_minutes = db.Column(db.Integer, default=60)
    notification_preferences = db.Column(db.Text)  # JSON string for notification settings
    difficulty_preference = db.Column(db.String(20))  # e.g., "beginner", "intermediate", "advanced"
    learning_style = db.Column(db.String(50))  # e.g., "visual", "practical", "theoretical"
    interests = db.Column(db.Text)  # JSON string of learning interests
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
