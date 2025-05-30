import os
from pathlib import Path

class Config:
    # Base directory of the project
    BASE_DIR = Path(__file__).resolve().parent

    # Model settings
    MODEL_PATH = os.getenv('MODEL_PATH', str(BASE_DIR / 'models' / 'llama-2-7b-chat.gguf'))
    
    # Flask settings
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() in ('true', '1', 't')
    HOST = os.getenv('FLASK_HOST', '0.0.0.0')
    PORT = int(os.getenv('FLASK_PORT', 5000))

    # CORS settings
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')

    # Security settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')

    # Model parameters
    MAX_TOKENS = int(os.getenv('MAX_TOKENS', 2048))
    TEMPERATURE = float(os.getenv('TEMPERATURE', 0.7))
    TOP_P = float(os.getenv('TOP_P', 0.95))
    
    @classmethod
    def get_cors_origins(cls):
        if '*' in cls.CORS_ORIGINS:
            return '*'
        return [origin.strip() for origin in cls.CORS_ORIGINS if origin.strip()] 