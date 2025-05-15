from . import db
from sqlalchemy.dialects.sqlite import JSON
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.String(10))
    gender = db.Column(db.String(20))
    education = db.Column(db.String(100))
    goal = db.Column(db.String(255))
    learning_path = db.Column(db.Text)  # JSON string
