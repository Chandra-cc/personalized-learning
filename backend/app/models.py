from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    education = db.Column(db.String(100))
    goal = db.Column(db.String(100))
