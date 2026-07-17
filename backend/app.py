from flask import Flask
from flask_cors import CORS
from config import Config
from db import db

from routes.user import user_bp
from routes.mood import mood_bp
from routes.cycle import cycle_bp
from routes.chat import chat_bp
from routes.profile import profile_bp

from models.user import User
from models.mood import Mood
from models.cycle import Cycle
from models.health_profile import HealthProfile

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



@app.route("/")
def home():

    return {
        "status": "success",
        "message": "🌸 HerSphere Backend Running!"
    }



if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)