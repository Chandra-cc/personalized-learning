from flask import Blueprint, request, jsonify
from .models import User, db
from .learning_paths import learning_path_templates
from werkzeug.security import generate_password_hash, check_password_hash
import json

main = Blueprint('main', __name__)

def generate_learning_path(goal):
    return learning_path_templates.get(goal, [])

# ----------------- AUTH -----------------

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

    return jsonify({"message": "Login successful", "user_id": user.id})

# ----------------- USER PROFILE -----------------

@main.route('/submit-user-data', methods=['POST'])
def submit_user_data():
    data = request.get_json()
    user_id = data.get('user_id')
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
    user.age = age
    user.gender = gender
    user.education = education
    user.goal = goal
    user.learning_path = json.dumps(learning_path)  # store as JSON string

    db.session.commit()

    return jsonify({
        "message": "User data submitted successfully",
        "learning_path": learning_path
    })

@main.route('/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Return user data, including learning_path JSON string and progress JSON string or empty
    return jsonify({
        "email": user.email,
        "age": user.age,
        "gender": user.gender,
        "education": user.education,
        "goal": user.goal,
        "learning_path": user.learning_path,  # JSON string, parse on frontend
        "progress": user.progress or "{}"
    })

# ----------------- LEARNING PATH / PROGRESS -----------------

@main.route('/update-progress/<int:user_id>', methods=['POST'])
def update_progress(user_id):
    data = request.get_json()
    step_index = data.get("step_index")

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    progress = json.loads(user.progress or "{}")
    progress[str(step_index)] = True
    user.progress = json.dumps(progress)

    db.session.commit()

    return jsonify({"message": "Progress updated", "progress": progress})


@main.route("/get-learning-path", methods=["GET"])
def get_learning_path():
    goal = request.args.get("goal")
    path = learning_path_templates.get(goal)

    if path:
        return jsonify({"goal": goal, "learning_path": path})
    else:
        return jsonify({"message": "No path found for the given goal"}), 404
