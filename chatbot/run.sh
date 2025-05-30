#!/bin/bash

# Kill any existing processes on ports 3000 and 5000
echo "Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5000 | xargs kill -9 2>/dev/null

# Install dependencies if needed
echo "Checking dependencies..."

# Backend setup
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt

# Create models directory if it doesn't exist
if [ ! -d "models" ]; then
    mkdir models
fi

# Check if model exists, if not download it using download_model.py
MODEL_PATH="models/models--facebook--blenderbot-400M-distill"
if [ ! -f "$MODEL_PATH" ]; then
    echo "Model not found. Running download_model.py..."
    python download_model.py
    
    # Verify model exists after download
    if [ ! -f "$MODEL_PATH" ]; then
        echo "Error: Model download failed. Please check download_model.py output."
        exit 1
    fi
fi

# Start backend
echo "Starting backend..."
python app.py &
cd ..

# Frontend setup
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "Starting frontend..."
npm start 