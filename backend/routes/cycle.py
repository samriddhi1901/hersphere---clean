from flask import Blueprint, request, jsonify

from db import db
from models.cycle import Cycle

from datetime import datetime, timedelta


cycle_bp = Blueprint("cycle", __name__)



# Add cycle data
@cycle_bp.route("/cycle", methods=["POST"])
def add_cycle():

    data = request.get_json()


    user_id = data.get("user_id")
    start_date = data.get("start_date")
    cycle_length = data.get("cycle_length",28)


    if not user_id or not start_date:

        return jsonify({
            "error":"Missing fields"
        }),400



    start_date_obj = datetime.strptime(
        start_date,
        "%Y-%m-%d"
    ).date()



    cycle = Cycle(

        user_id=user_id,

        start_date=start_date_obj,

        cycle_length=cycle_length

    )


    db.session.add(cycle)

    db.session.commit()



    return jsonify({

        "message":"Cycle saved successfully"

    }),201





# Get cycle history
@cycle_bp.route("/cycle/<int:user_id>", methods=["GET"])
def get_cycle(user_id):


    cycles = Cycle.query.filter_by(
        user_id=user_id
    ).all()



    result=[]


    for c in cycles:

        next_period = (
            c.start_date +
            timedelta(days=c.cycle_length)
        )


        result.append({

            "start_date":str(c.start_date),

            "cycle_length":c.cycle_length,

            "next_period":str(next_period)

        })


    return jsonify(result)