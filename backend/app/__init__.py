from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .config import Config  # Make sure you have a config.py with Config class

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # ✅ Load database config

    CORS(app)  # ✅ Enable CORS
    db.init_app(app)  # ✅ Init DB

    from .routes import main  # ✅ Corrected blueprint import
    app.register_blueprint(main)

    from .models import User # ✅ Import models to register them
      # ✅ Import models to register them

    with app.app_context():
        db.create_all()  # ✅ Create DB tables if they don't exist

    return app
