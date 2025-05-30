from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os
from tqdm import tqdm

MODEL_NAME = "facebook/blenderbot-400M-distill"
CACHE_DIR = "models"

def download_model():
    """Download and cache the model and tokenizer"""
    try:
        # Create cache directory if it doesn't exist
        os.makedirs(CACHE_DIR, exist_ok=True)
        
        print(f"Downloading model {MODEL_NAME}...")
        
        # Download and cache the tokenizer
        print("Downloading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, cache_dir=CACHE_DIR)
        
        # Download and cache the model
        print("Downloading model...")
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME, cache_dir=CACHE_DIR)
        
        print(f"Model and tokenizer successfully downloaded to {CACHE_DIR}")
        return True
        
    except Exception as e:
        print(f"Error downloading model: {str(e)}")
        return False

if __name__ == "__main__":
    if os.path.exists(os.path.join(CACHE_DIR, MODEL_NAME.split('/')[-1])):
        print(f"Model already exists in {CACHE_DIR}")
    else:
        success = download_model()
        if success:
            print("Download complete!")
        else:
            print("Download failed. Please try again.") 