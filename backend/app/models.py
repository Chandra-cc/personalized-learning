from . import db
from sqlalchemy.dialects.sqlite import JSON
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    education = db.Column(db.String(100), nullable=False)
    goal = db.Column(db.String(100), nullable=False)
    learning_path = db.Column(JSON)
