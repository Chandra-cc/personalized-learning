#!/bin/bash

echo "Starting the application..."

# Activate virtual environment
source venv/bin/activate

# Start backend Flask server
cd backend
python run.py &
BACKEND_PID=$!
cd ..

# Start frontend development server
cd frontend
npm install
# Set environment variables for React to bind to all interfaces
export PORT=3000
export HOST=0.0.0.0
# Start React with host binding
HOST=0.0.0.0 npm start &
FRONTEND_PID=$!
cd ..

echo "Both servers are starting..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "To stop the servers, run: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Your application should be accessible at:"
echo "Frontend: http://<your-ec2-public-ip>:3000"
echo "Backend: http://<your-ec2-public-ip>:5000"
echo ""
echo "Make sure your EC2 security group allows inbound traffic on ports 3000 and 5000"

# Keep the script running to maintain the background processes
wait 