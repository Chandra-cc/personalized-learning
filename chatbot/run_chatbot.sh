#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check and install Python dependencies
setup_python_env() {
    echo "Setting up Python virtual environment..."
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Upgrade pip and install dependencies
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Download the LLaMA model if it doesn't exist
    echo "Checking for LLaMA model..."
    python download_model.py
    
    cd ..
}

# Function to setup and start the frontend
setup_frontend() {
    echo "Setting up React frontend..."
    cd frontend
    
    # Install npm dependencies
    echo "Installing frontend dependencies..."
    npm install
    
    # Start the frontend in the background
    echo "Starting React frontend..."
    npm start &
    
    cd ..
}

# Function to start the backend
start_backend() {
    echo "Starting Flask backend..."
    cd backend
    source venv/bin/activate
    python app.py &
    cd ..
}

# Check for required commands
if ! command_exists python3; then
    echo "Error: python3 is required but not installed."
    exit 1
fi

if ! command_exists npm; then
    echo "Error: npm is required but not installed."
    exit 1
fi

# Main execution
echo "Starting Chatbot Application..."

# Setup Python environment and download model
setup_python_env

# Setup and start frontend
setup_frontend

# Start backend
start_backend

echo "Both frontend and backend are starting up..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"
echo "Press Ctrl+C to stop all services"

# Wait for any background process to finish
wait