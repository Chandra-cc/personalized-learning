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
    print("Received data:", data)
    user_id = data.get('user_id')
    print("User ID",user_id)  # Expect frontend to send user_id after login/signup
    age = data.get('age')
    gender = data.get('gender')
    education = data.get('education')
    goal = data.get('goal')

    if not all([age, gender, education, goal]):
        return jsonify({"message": "Missing fields"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    learning_path = generate_learning_path(goal)
    learning_path_json = json.dumps(learning_path)

    # Update user profile fields
    user.age = age
    user.gender = gender
    user.education = education
    user.goal = goal
    user.learning_path = learning_path_json

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
    
from werkzeug.security import generate_password_hash, check_password_hash

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
    print("user_id", user.id)
    return jsonify({"message": "Login successful", "user_id": user.id})
