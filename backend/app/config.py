class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///learning.db"  # Use SQLite for now; we can switch to Postgres later
    SQLALCHEMY_TRACK_MODIFICATIONS = False
