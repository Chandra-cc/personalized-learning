from flask import Blueprint, request, jsonify
from .models import db, User

main = Blueprint('main', __name__)

@main.route("/submit", methods=["POST"])
def submit():
    data = request.json
    user = User(
        age=data.get("age"),
        gender=data.get("gender"),
        education=data.get("education"),
        goal=data.get("goal")
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User data submitted successfully"}), 201
