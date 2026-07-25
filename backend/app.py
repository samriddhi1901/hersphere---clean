from routes.profile import profile_bp
from routes.nutrition import nutrition_bp
from routes.dashboard import dashboard_bp

from models.user import User
from models.mood import Mood
from models.cycle import Cycle
from models.health_profile import HealthProfile
from models.nutrition import NutritionLog
from models.water import WaterLog
app = Flask(__name__)

app.config.from_object(Config)


db.init_app(app)

from flask_cors import CORS

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    },
    supports_credentials=False
)


# Register routes

app.register_blueprint(chat_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(cycle_bp, url_prefix="/api")
app.register_blueprint(mood_bp, url_prefix="/api")
app.register_blueprint(profile_bp, url_prefix="/api")
app.register_blueprint(nutrition_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")


@app.route("/")
def home():

    return {
        "status": "success",
        "message": "🌸 HerSphere Backend Running!"
    }


# Ensure tables exist regardless of how the app is started
# (gunicorn imports this module and never hits __main__, so this
# must run at import time, not just under `python app.py`)
with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)