#!/bin/bash

echo "========================================"
echo "AI Skill Gap Analyzer - Setup Script"
echo "========================================"
echo ""

echo "[1/4] Setting up Backend..."
cd backend

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Downloading spaCy model..."
python -m spacy download en_core_web_sm

echo "Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Please configure your API keys in backend/.env"
fi

cd ..

echo ""
echo "[2/4] Setting up Frontend..."
cd frontend

echo "Installing Node dependencies..."
npm install

cd ..

echo ""
echo "[3/4] Setting up MongoDB..."
echo "Please ensure MongoDB is running on localhost:27017"
echo "Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:7.0"

echo ""
echo "[4/4] Setup Complete!"
echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo "1. Configure API keys in backend/.env"
echo "2. Start MongoDB (if not using Docker)"
echo "3. Run ./start.sh to launch the application"
echo ""
