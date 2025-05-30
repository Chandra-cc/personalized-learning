from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

app = Flask(__name__)
CORS(app)

# Initialize the model
MODEL_NAME = "facebook/blenderbot-400M-distill"  # Much smaller distilled model
generator = pipeline('text-generation', model=MODEL_NAME, device=-1)  # -1 means CPU

# System prompt for learning path assistant
SYSTEM_PROMPT = """You are a helpful learning path assistant. Your role is to guide users in their learning journey by:
1. Understanding their learning goals
2. Assessing their current knowledge level
3. Providing structured learning paths
4. Breaking down complex topics into manageable steps
Keep responses concise and focused on creating learning paths."""

def create_prompt(user_message):
    return f"{SYSTEM_PROMPT}\n\nUser: {user_message}\nAssistant:"

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
        response = generator(
            prompt,
            max_length=256,
            num_return_sequences=1,
            temperature=0.7,
            do_sample=True
        )

        # Extract the generated text
        bot_response = response[0]['generated_text'].strip()
        
        return jsonify({
            'response': bot_response,
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 