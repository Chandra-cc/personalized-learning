#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Create logs directory if it doesn't exist
mkdir -p "$SCRIPT_DIR/logs"

# Log file paths with absolute paths
BACKEND_LOG="$SCRIPT_DIR/logs/backend.log"
FRONTEND_LOG="$SCRIPT_DIR/logs/frontend.log"
ERROR_LOG="$SCRIPT_DIR/logs/error.log"

# Create log files if they don't exist
touch "$BACKEND_LOG" "$FRONTEND_LOG" "$ERROR_LOG"

echo "Starting the application..." | tee -a "$ERROR_LOG"

# Kill any existing processes
echo "Cleaning up existing processes..." | tee -a "$ERROR_LOG"
pkill -f "python run.py"
pkill -f "node.*start"

# Activate virtual environment
source "$SCRIPT_DIR/venv/bin/activate" || {
    echo "Failed to activate virtual environment" | tee -a "$ERROR_LOG"
    exit 1
}

# Start backend Flask server
echo "Starting backend server..." | tee -a "$ERROR_LOG"
cd "$SCRIPT_DIR/backend" || {
    echo "Failed to change to backend directory" | tee -a "$ERROR_LOG"
    exit 1
}

# Install backend dependencies
pip install -r requirements.txt >> "$BACKEND_LOG" 2>&1 || {
    echo "Failed to install backend dependencies" | tee -a "$ERROR_LOG"
    exit 1
}

# Start backend with nohup
nohup python run.py >> "$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!
cd "$SCRIPT_DIR"

# Verify backend started successfully
sleep 5
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "Backend failed to start. Check $BACKEND_LOG for details" | tee -a "$ERROR_LOG"
    exit 1
fi

# Start frontend development server
echo "Starting frontend server..." | tee -a "$ERROR_LOG"
cd "$SCRIPT_DIR/frontend" || {
    echo "Failed to change to frontend directory" | tee -a "$ERROR_LOG"
    exit 1
}

# Install frontend dependencies
npm install >> "$FRONTEND_LOG" 2>&1 || {
    echo "Failed to install frontend dependencies" | tee -a "$ERROR_LOG"
    exit 1
}

# Set environment variables for React
export PORT=3000
export HOST=0.0.0.0

# Start React with nohup
nohup npm start >> "$FRONTEND_LOG" 2>&1 &
FRONTEND_PID=$!
cd "$SCRIPT_DIR"

# Verify frontend started successfully
sleep 10
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo "Frontend failed to start. Check $FRONTEND_LOG for details" | tee -a "$ERROR_LOG"
    kill $BACKEND_PID
    exit 1
fi

# Save PIDs to a file for later use
echo "$BACKEND_PID" > "$SCRIPT_DIR/logs/backend.pid"
echo "$FRONTEND_PID" > "$SCRIPT_DIR/logs/frontend.pid"

echo "Application started successfully!" | tee -a "$ERROR_LOG"
echo "----------------------------------------" | tee -a "$ERROR_LOG"
echo "Backend PID: $BACKEND_PID (saved to logs/backend.pid)" | tee -a "$ERROR_LOG"
echo "Frontend PID: $FRONTEND_PID (saved to logs/frontend.pid)" | tee -a "$ERROR_LOG"
echo "" | tee -a "$ERROR_LOG"
echo "Log files:" | tee -a "$ERROR_LOG"
echo "Backend log: $BACKEND_LOG" | tee -a "$ERROR_LOG"
echo "Frontend log: $FRONTEND_LOG" | tee -a "$ERROR_LOG"
echo "Error log: $ERROR_LOG" | tee -a "$ERROR_LOG"
echo "" | tee -a "$ERROR_LOG"
echo "Your application should be accessible at:" | tee -a "$ERROR_LOG"
echo "Frontend: http://$(curl -s ifconfig.me):3000" | tee -a "$ERROR_LOG"
echo "Backend: http://$(curl -s ifconfig.me):5000" | tee -a "$ERROR_LOG"
echo "" | tee -a "$ERROR_LOG"
echo "To stop the servers, run: kill \$(cat $SCRIPT_DIR/logs/backend.pid) \$(cat $SCRIPT_DIR/logs/frontend.pid)" | tee -a "$ERROR_LOG"
echo "Make sure your EC2 security group allows inbound traffic on ports 3000 and 5000" | tee -a "$ERROR_LOG"

# Script will exit but services continue running in background 