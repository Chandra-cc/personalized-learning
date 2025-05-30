from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_cpp import Llama
import os

app = Flask(__name__)
CORS(app)

# Initialize the model (will download if not present)
MODEL_PATH = "models/llama-2-7b-chat.Q4_K_M.gguf"

# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# System prompt for learning path assistant
SYSTEM_PROMPT = """You are a helpful learning path assistant. Your role is to guide users in their learning journey by:
1. Understanding their learning goals
2. Assessing their current knowledge level
3. Providing structured learning paths
4. Breaking down complex topics into manageable steps
Keep responses concise and focused on creating learning paths."""

# Initialize Llama model with 4-bit quantization
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,  # Reduced context size for memory efficiency
    n_threads=4,  # Adjust based on available CPU cores
    n_gpu_layers=0  # CPU only
)

def create_prompt(user_message):
    return f"""<s>[INST] <<SYS>>{SYSTEM_PROMPT}<</SYS>>
{user_message}[/INST]"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Create the prompt
        prompt = create_prompt(user_message)
        
        # Generate response
        response = llm(
            prompt,
            max_tokens=256,  # Limit response length
            temperature=0.7,
            top_p=0.95,
            stop=["</s>", "[INST]"],  # Stop at end of response
            echo=False
        )

        # Extract the generated text
        bot_response = response['choices'][0]['text'].strip()
        
        return jsonify({
            'response': bot_response,
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 