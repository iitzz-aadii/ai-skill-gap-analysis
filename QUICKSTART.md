# Quick Start Guide

## For Windows Users

### 1. Prerequisites Check

Open Command Prompt and verify:

```bash
python --version   # Should be 3.11 or higher
node --version     # Should be 18 or higher
npm --version
```

### 2. Setup (One-time)

```bash
# Run the setup script
setup.bat

# Configure your API keys
# Edit backend\.env and add your Gemini or OpenAI API key
notepad backend\.env
```

### 3. Start MongoDB

```bash
# Option A: Using Docker (Recommended)
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Option B: Use local MongoDB if installed
# Just ensure it's running on port 27017
```

### 4. Run the Application

```bash
# Simply run
start.bat

# This will open two command windows:
# - Backend (FastAPI) on http://localhost:8000
# - Frontend (React) on http://localhost:5173
```

### 5. Access the App

Open your browser and go to: **http://localhost:5173**

## For Linux/Mac Users

### 1. Prerequisites Check

```bash
python3 --version   # Should be 3.11 or higher
node --version      # Should be 18 or higher
npm --version
```

### 2. Setup (One-time)

```bash
# Make scripts executable
chmod +x setup.sh start.sh

# Run the setup script
./setup.sh

# Configure your API keys
nano backend/.env
# or
vim backend/.env
```

### 3. Start MongoDB

```bash
# Using Docker (Recommended)
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### 4. Run the Application

```bash
./start.sh
```

### 5. Access the App

Open your browser and go to: **http://localhost:5173**

## Using Docker (All Platforms)

### Quick Start with Docker Compose

```bash
# 1. Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

# 2. Build and run
docker-compose up -d

# 3. Access at http://localhost
```

### Stop Docker Services

```bash
docker-compose down
```

## Getting API Keys (Optional but Recommended)

### Google Gemini (Free Tier Available)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and paste into `backend/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### OpenAI (Alternative)

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy and paste into `backend/.env`:
   ```
   OPENAI_API_KEY=your_key_here
   ```

**Note:** The app works without API keys, but some AI features will use simpler fallback responses.

## First Time Usage

1. **Upload Resume**: Use PDF, DOCX, or TXT format, or paste text directly
2. **Add Job Description**: Copy and paste the complete job posting
3. **Click Analyze**: Wait 5-10 seconds for AI analysis
4. **Review Results**: See your skill gaps and recommendations
5. **Chat with AI**: Get personalized career advice

## Troubleshooting

### Backend won't start

- Check if port 8000 is available
- Ensure MongoDB is running
- Verify Python dependencies: `pip install -r backend/requirements.txt`

### Frontend won't start

- Check if port 5173 is available
- Delete `node_modules` and run `npm install` again
- Clear browser cache

### MongoDB connection error

- Verify MongoDB is running: `docker ps`
- Check connection string in `backend/.env`

### NLP errors

- Download spaCy model: `python -m spacy download en_core_web_sm`

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Open an issue on GitHub for bugs or questions

---

**Enjoy analyzing your skill gaps!** 🚀
