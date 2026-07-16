from flask import Blueprint, request, jsonify

from db import db
from models.health_profile import HealthProfile


profile_bp = Blueprint("profile", __name__)



# Create health profile
@profile_bp.route("/profile/setup", methods=["POST"])
def setup_profile():

    data = request.get_json()


    user_id = data.get("user_id")
    wellness_goal = data.get("wellness_goal")
    cycle_length = data.get("cycle_length", 28)
    track_nutrition = data.get("track_nutrition", False)



    if not user_id or not wellness_goal:

        return jsonify({
            "error": "Missing required fields"
        }),400



    # Check if profile already exists

    existing_profile = HealthProfile.query.filter_by(
        user_id=user_id
    ).first()



    if existing_profile:

        return jsonify({
            "message":"Profile already exists"
        }),200



    profile = HealthProfile(

        user_id=user_id,

        wellness_goal=wellness_goal,

        cycle_length=cycle_length,

        track_nutrition=track_nutrition

    )


    db.session.add(profile)

    db.session.commit()



    return jsonify({

        "message":"Health profile created successfully",

        "profile_id":profile.id

    }),201





# Get user health profile

@profile_bp.route("/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):


    profile = HealthProfile.query.filter_by(
        user_id=user_id
    ).first()



    if not profile:


        return jsonify({

            "exists":False

        }),200




    return jsonify({

        "exists":True,

        "profile":{

            "id":profile.id,

            "wellness_goal":profile.wellness_goal,

            "cycle_length":profile.cycle_length,

            "track_nutrition":profile.track_nutrition

        }

    }),200