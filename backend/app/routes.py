from flask import Blueprint, request, jsonify

main_routes = Blueprint('main', __name__)

@main_routes.route('/submit-user-data', methods=['POST'])
def submit_user_data():
    data = request.get_json()
    print("Received user data:", data)
    return jsonify({"message": "User data submitted successfully"})
