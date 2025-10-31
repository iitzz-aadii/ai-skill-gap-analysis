#!/bin/bash

echo "========================================"
echo "Starting AI Skill Gap Analyzer"
echo "========================================"
echo ""

echo "Starting Backend..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

sleep 3

echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "Application is running!"
echo "========================================"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for interrupt
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
