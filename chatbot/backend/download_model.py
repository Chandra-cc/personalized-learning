import os
import requests
from tqdm import tqdm

MODEL_URL = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"
MODEL_PATH = "models/llama-2-7b-chat.Q4_K_M.gguf"

def download_file():
    os.makedirs("models", exist_ok=True)
    
    print(f"Downloading model to {MODEL_PATH}...")
    response = requests.get(MODEL_URL, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(MODEL_PATH, 'wb') as file, tqdm(
        desc="Downloading",
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as progress_bar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            progress_bar.update(size)

if __name__ == "__main__":
    if os.path.exists(MODEL_PATH):
        print(f"Model already exists at {MODEL_PATH}")
    else:
        download_file()
        print("Download complete!") 