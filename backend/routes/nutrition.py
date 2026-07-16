from flask import Blueprint, request, jsonify


nutrition_bp = Blueprint(
    "nutrition",
    __name__
)



# Save nutrition data
@nutrition_bp.route("/nutrition", methods=["POST"])
def add_nutrition():

    data = request.get_json()


    user_id = data.get("user_id")
    food = data.get("food")
    calories = data.get("calories")


    if not user_id or not food:

        return jsonify({
            "error":"Missing fields"
        }),400



    # Currently returning data
    # Later connect with Nutrition model


    return jsonify({

        "message":"Nutrition saved successfully",

        "data":{

            "food":food,

            "calories":calories

        }

    }),201





# Get nutrition history
@nutrition_bp.route("/nutrition/<int:user_id>", methods=["GET"])
def get_nutrition(user_id):


    return jsonify({

        "user_id":user_id,

        "nutrition":[]

    })