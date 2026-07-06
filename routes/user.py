from flask import Blueprint, request, jsonify
from db import db
from models.user import User

user_bp = Blueprint("user", __name__)

@user_bp.route("/user", methods=["POST"])
def create_user():
    data = request.get_json()

    clerk_id = data.get("clerk_user_id")
    email = data.get("email")
    name = data.get("name")

    if not clerk_id:
        return jsonify({"error": "Missing Clerk ID"}), 400

    # check if user exists
    existing_user = User.query.filter_by(clerk_user_id=clerk_id).first()

    if existing_user:
        return jsonify({"message": "User already exists"}), 200

    new_user = User(
        clerk_user_id=clerk_id,
        email=email,
        name=name
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201