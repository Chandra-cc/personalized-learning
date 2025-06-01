from flask import Flask, request, jsonify, session
from flask_cors import CORS
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import re
import os
from datetime import timedelta

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Required for session
app.permanent_session_lifetime = timedelta(minutes=30)  # Session timeout
CORS(app)

# Initialize rate limiter
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["50 per minute"]
)

# Initialize the model and tokenizer
MODEL_NAME = "facebook/blenderbot-400M-distill"
tokenizer = BlenderbotTokenizer.from_pretrained(MODEL_NAME)
model = BlenderbotForConditionalGeneration.from_pretrained(MODEL_NAME)

# Learning path assistant context
CONTEXT_PROMPT = "You are a learning path assistant helping users create personalized learning paths. "

def format_message(message):
    """Format the message to be more specific to learning path context"""
    # Add context markers and learning-focused prefixes
    formatted = CONTEXT_PROMPT + message
    
    # Add learning-specific keywords if they're not present
    if not any(word in message.lower() for word in ['learn', 'study', 'understand', 'know']):
        formatted = "Regarding learning and education: " + formatted
    
    return formatted

def get_bot_response(user_message, history=None):
    """Generate response using BlenderBot model with conversation history"""
    if history is None:
        history = []
    
    # Format the message with learning context
    formatted_message = format_message(user_message)
    
    # Prepare conversation history
    if history:
        # Combine history with current message, limited to last 3 turns
        context = " ".join(history[-3:]) + " " + formatted_message
    else:
        context = formatted_message
    
    # Encode the context
    inputs = tokenizer(context, return_tensors="pt", truncation=True, max_length=256)
    
    # Generate response with carefully tuned parameters
    reply_ids = model.generate(
        inputs["input_ids"],
        max_length=150,        # Increased for more detailed responses
        min_length=20,         # Increased to avoid short responses
        temperature=0.8,       # Slightly increased for more creative responses
        do_sample=True,
        top_p=0.95,           # Increased for more diverse vocabulary
        top_k=50,             # Added to maintain focus
        repetition_penalty=1.2,  # Added to prevent repetitive responses
        length_penalty=1.0,    # Balanced length penalty
        num_return_sequences=1,
        no_repeat_ngram_size=3  # Prevent repetition of phrases
    )
    
    # Decode the response
    bot_response = tokenizer.decode(reply_ids[0], skip_special_tokens=True)
    
    # Post-process the response
    bot_response = post_process_response(bot_response)
    
    return bot_response

def post_process_response(response):
    """Clean and improve the response"""
    # Remove any generic/unwanted phrases
    unwanted_phrases = [
        "I don't know",
        "I'm not sure",
        "I can't help",
        "I am a bot",
        "I am an AI"
    ]
    
    cleaned_response = response
    for phrase in unwanted_phrases:
        cleaned_response = cleaned_response.replace(phrase, "")
    
    # Ensure the response ends with proper punctuation
    if not any(cleaned_response.strip().endswith(p) for p in '.!?'):
        cleaned_response = cleaned_response.strip() + '.'
    
    # Clean up extra whitespace
    cleaned_response = ' '.join(cleaned_response.split())
    
    return cleaned_response

def validate_message(message):
    """Validate the user's message."""
    if not isinstance(message, str):
        raise ValueError("Message must be a string")
    if not message.strip():
        raise ValueError("Message cannot be empty")
    if len(message) > 500:  # Reasonable limit for input
        raise ValueError("Message is too long (max 500 characters)")
    return message.strip()

@app.route('/api/chat', methods=['POST'])
@limiter.limit("5 per minute")
def chat():
    try:
        # Validate request
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
        
        data = request.json
        if not data:
            return jsonify({'error': 'Request body cannot be empty'}), 400
        
        # Get and validate message
        user_message = data.get('message')
        try:
            user_message = validate_message(user_message)
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        # Get conversation history from session
        if 'history' not in session:
            session['history'] = []
        
        # Generate response with history
        bot_response = get_bot_response(user_message, session['history'])
        
        # Update history with current exchange
        session['history'].extend([user_message, bot_response])
        # Keep only last 6 messages (3 exchanges) to maintain context without overflow
        session['history'] = session['history'][-6:]
        
        # Validate response
        if not bot_response:
            return jsonify({
                'error': 'Failed to generate a valid response',
                'status': 'error'
            }), 500

        return jsonify({
            'response': bot_response,
            'status': 'success'
        })

    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)