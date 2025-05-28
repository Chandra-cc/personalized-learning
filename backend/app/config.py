class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///learning.db'  # or your MySQL/Postgres URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS settings
    CORS_HEADERS = 'Content-Type'
    # Allow both local and EC2 frontend
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://34.227.104.91:3000"  # EC2 frontend URL
    ]
    CORS_SUPPORTS_CREDENTIALS = True
    CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    CORS_ALLOW_HEADERS = ["Content-Type", "Authorization"]