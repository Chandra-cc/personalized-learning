# app/routes.py

from flask import Blueprint, request, jsonify
from .models import User, db
from .learning_paths import learning_path_templates
import json

main = Blueprint('main', __name__)

def generate_learning_path(goal):
    # Example simple generator using predefined templates
    return learning_path_templates.get(goal, [])

@main.route('/submit-user-data', methods=['POST'])
def submit_user_data():
    data = request.get_json()
    age = data.get('age')
    gender = data.get('gender')
    education = data.get('education')
    goal = data.get('goal')

    # Basic validation
    if not all([age, gender, education, goal]):
        return jsonify({"message": "Missing fields"}), 400

    learning_path = generate_learning_path(goal)

    # If your DB doesn't support JSON field, convert to string:
    # learning_path_json = json.dumps(learning_path)

    user = User(
        age=age,
        gender=gender,
        education=education,
        goal=goal,
        learning_path=learning_path  # or learning_path_json if using string field
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User data submitted successfully", "learning_path": learning_path})

@main.route("/get-learning-path", methods=["GET"])
def get_learning_path():
    goal = request.args.get("goal")
    path = learning_path_templates.get(goal)

    if path:
        return jsonify({"goal": goal, "learning_path": path})
    else:
        return jsonify({"message": "No path found for the given goal"}), 404
    
