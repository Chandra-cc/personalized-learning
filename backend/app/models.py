from . import db
from sqlalchemy.dialects.sqlite import JSON
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
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
    preferences = db.relationship('UserPreferences', backref='user', lazy=True)

class StepProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date)
    total_time_spent = db.Column(db.Integer, default=0)  # Minutes spent learning
    steps_completed = db.Column(db.Integer, default=0)
    resources_accessed = db.Column(db.Integer, default=0)
    daily_streak = db.Column(db.Integer, default=0)
    focus_score = db.Column(db.Float)  # Calculated based on session lengths and breaks
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Learning Style and Preferences
    learning_style = db.Column(db.String(50))  # visual, auditory, reading/writing, kinesthetic
    difficulty_preference = db.Column(db.String(50))  # beginner, intermediate, advanced
    daily_goal_minutes = db.Column(db.Integer)
    preferred_learning_time = db.Column(db.String(50))  # morning, afternoon, evening, night
    
    # Enhanced Learning Preferences
    preferred_content_types = db.Column(db.String(500))  # JSON array: ["video", "text", "interactive", "project-based"]
    preferred_session_duration = db.Column(db.Integer)  # minutes
    learning_environment = db.Column(db.String(50))  # quiet, background-music, collaborative, etc.
    
    # Professional Context
    current_role = db.Column(db.String(100))
    years_of_experience = db.Column(db.Float)
    industry = db.Column(db.String(100))
    career_goals = db.Column(db.String(500))  # JSON array of career objectives
    
    # Prior Knowledge
    education_level = db.Column(db.String(100))
    certifications = db.Column(db.String(500))  # JSON array
    skills_self_assessment = db.Column(db.String(1000))  # JSON object mapping skills to proficiency levels
    
    # Learning Constraints
    available_hours_per_week = db.Column(db.Integer)
    preferred_deadline = db.Column(db.Date)
    accessibility_needs = db.Column(db.String(500))  # JSON array of accessibility requirements
    
    # Interests and Motivation
    interests = db.Column(db.String(500))  # JSON array
    motivation_factors = db.Column(db.String(500))  # JSON array: ["career-growth", "personal-interest", etc.]
    preferred_teaching_styles = db.Column(db.String(500))  # JSON array: ["practical", "theoretical", "mixed"]
    
    # Social Learning Preferences
    collaboration_preference = db.Column(db.String(50))  # individual, pair, group
    mentorship_interest = db.Column(db.Boolean, default=False)
    social_learning_platforms = db.Column(db.String(500))  # JSON array of preferred platforms
    
    # Technical Preferences
    preferred_tools = db.Column(db.String(500))  # JSON array of preferred development tools
    device_constraints = db.Column(db.String(500))  # JSON object of device/technical limitations
    
    # Learning Analytics
    learning_pace = db.Column(db.String(50))  # self-paced, structured, intensive
    retention_strategies = db.Column(db.String(500))  # JSON array of preferred retention methods
    feedback_frequency = db.Column(db.String(50))  # immediate, daily, weekly
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<UserPreferences {self.user_id}>'
