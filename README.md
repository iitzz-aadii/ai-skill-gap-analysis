# AI Skill Gap Analyzer & Improvement Suggester

A complete full-stack AI-powered application that analyzes the gap between your resume and job requirements, providing personalized skill improvement recommendations and learning paths.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Features

### Core Features

- **📄 Resume Analysis**: Upload resume (PDF/TXT/DOCX) or paste text directly
- **🎯 Skill Matching**: AI-powered skill extraction and matching using NLP
- **📊 Gap Analysis**: Identify missing and weak skills with priority levels
- **💯 Fit Scoring**: Calculate skill-fit percentage and profile compatibility score
- **🚀 Learning Roadmap**: Personalized improvement suggestions with resources
- **💬 AI Career Coach**: Interactive chatbot for upskilling advice
- **📈 Progress Tracking**: Save and monitor skill improvement progress

### Bonus Features

- **✍️ Resume Rewrite Suggestions**: LLM-powered resume improvement tips
- **🤖 Ask AI Chatbot**: Personalized career guidance and learning strategies
- **📚 Course Recommendations**: Curated learning resources for each skill gap
- **💾 Analysis History**: Save and review past analyses
- **📥 Export Reports**: Download analysis results as text reports

## 🛠️ Tech Stack

### Frontend

- **React 18** with Vite for fast development
- **TailwindCSS** for modern, responsive UI
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for beautiful icons

### Backend

- **FastAPI** for high-performance REST API
- **Python 3.11+** for core logic
- **Motor & Beanie** for async MongoDB operations
- **Uvicorn** as ASGI server

### AI/NLP

- **spaCy** for advanced NLP and skill extraction
- **Sentence-BERT** for semantic similarity analysis
- **HuggingFace Transformers** for embeddings
- **Google Gemini** or **OpenAI GPT** for LLM features

### Database

- **MongoDB** for flexible document storage

### DevOps

- **Docker & Docker Compose** for containerization
- **Nginx** for production frontend serving

## 📋 Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- **MongoDB** (local or Docker)
- **Git**
- **API Keys**: Google Gemini or OpenAI (optional but recommended for full features)

## 🚀 Quick Start

### Option 1: Local Development (Windows)

1. **Clone the repository**

```bash
git clone <repository-url>
cd ai-skill-gap
```

2. **Run setup script**

```bash
setup.bat
```

3. **Configure environment**
   - Edit `backend\.env` with your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
# OR
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start MongoDB** (if not using Docker)

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or use local MongoDB installation
```

5. **Start the application**

```bash
start.bat
```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Docker Deployment

1. **Clone and configure**

```bash
git clone <repository-url>
cd ai-skill-gap
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys
```

2. **Build and run with Docker Compose**

```bash
docker-compose up -d
```

3. **Access the application**

   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

4. **Stop the application**

```bash
docker-compose down
```

## 📖 Manual Setup (Linux/Mac)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run the server
python main.py
# Or with uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Database Setup

**Using Docker:**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

**Or install MongoDB locally:**

- Download from https://www.mongodb.com/try/download/community
- Follow installation instructions for your OS

## 🎮 Usage Guide

### 1. Analyze Your Resume

1. Navigate to the home page
2. Upload your resume (PDF, TXT, or DOCX) or paste text
3. Paste the job description you're targeting
4. Click "Analyze Skill Gap"

### 2. Review Results

The dashboard shows:

- **Profile Fit Score**: Overall compatibility (0-100)
- **Skill Match Percentage**: How many required skills you have
- **Matched Skills**: Skills you already possess
- **Missing Skills**: Skills you need to acquire (prioritized)
- **Learning Roadmap**: Step-by-step improvement plan
- **Resume Tips**: AI-generated suggestions to improve your resume

### 3. Chat with AI Coach

1. Click on "AI Coach" in the navigation
2. Ask questions about:
   - Learning strategies
   - Resource recommendations
   - Career advice
   - Skill prioritization
3. Get personalized, context-aware responses

### 4. Track Progress

- Save skills you're working on
- Update your progress as you learn
- Monitor completion status

## 🔧 Configuration

### Environment Variables (backend/.env)

```env
# API Keys (at least one recommended)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Database
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=skill_gap_analyzer

# Application
ENVIRONMENT=development
DEBUG=True
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=10485760

# AI Settings
USE_GEMINI=True
MODEL_NAME=gemini-pro
SIMILARITY_THRESHOLD=0.7
```

### Getting API Keys

**Google Gemini (Recommended - Free Tier Available):**

1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `.env` as `GEMINI_API_KEY`

**OpenAI (Alternative):**

1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Add to `.env` as `OPENAI_API_KEY`

**Note:** The application works with basic features even without API keys, but LLM-powered features (resume suggestions, AI chat) will use fallback responses.

## 📁 Project Structure

```
ai-skill-gap/
├── backend/
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   │   ├── analysis.py   # Resume analysis endpoints
│   │   │   ├── chat.py       # AI chat endpoints
│   │   │   └── progress.py   # Progress tracking
│   │   ├── services/         # Business logic
│   │   │   ├── nlp_service.py       # NLP & skill extraction
│   │   │   ├── analysis_service.py  # Analysis logic
│   │   │   ├── llm_service.py       # LLM integration
│   │   │   └── file_service.py      # File processing
│   │   ├── models.py         # Data models
│   │   ├── config.py         # Configuration
│   │   └── database.py       # Database connection
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── Dockerfile
├── docker-compose.yml        # Docker orchestration
├── setup.bat                 # Windows setup script
├── start.bat                 # Windows start script
└── README.md                 # This file
```

## 🧪 API Documentation

Once the backend is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

**Analysis:**

- `POST /api/analysis/analyze` - Analyze resume vs job description
- `GET /api/analysis/history` - Get analysis history
- `GET /api/analysis/history/{id}` - Get specific analysis

**Chat:**

- `POST /api/chat/message` - Send message to AI coach
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

**Progress:**

- `POST /api/progress/` - Create progress tracker
- `GET /api/progress/{user_id}` - Get user progress
- `PUT /api/progress/{progress_id}` - Update progress
- `DELETE /api/progress/{progress_id}` - Delete progress

## 🎨 Screenshots

_Add screenshots of your application here_

## 🔍 How It Works

1. **Skill Extraction**: spaCy and pattern matching extract skills from resume and job description
2. **Semantic Analysis**: Sentence-BERT computes semantic similarity between texts
3. **Skill Matching**: AI compares skills using both exact and semantic matching
4. **Gap Identification**: Identifies missing, weak, and matched skills with importance levels
5. **Recommendation Generation**: Creates personalized learning paths with resources
6. **LLM Enhancement**: Uses Gemini/GPT to generate resume tips and chat responses

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

- Ensure Python 3.11+ is installed
- Check if MongoDB is running
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is available

**Frontend won't start:**

- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

**MongoDB connection errors:**

- Verify MongoDB is running: `docker ps` or check local service
- Check connection string in `.env`

**NLP model errors:**

- Download spaCy model: `python -m spacy download en_core_web_sm`

**CORS errors:**

- Check that backend CORS settings include frontend URL
- Ensure proxy is configured in `vite.config.js`

## 💡 Tips for Best Results

1. **Resume Quality**: Provide detailed, well-formatted resumes for better skill extraction
2. **Job Descriptions**: Include complete job postings with requirements and responsibilities
3. **API Keys**: Configure LLM API keys for enhanced features
4. **Specific Questions**: Ask specific questions in the AI chat for better advice

## 🚧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Integration with course platforms APIs (Coursera, Udemy)
- [ ] LinkedIn profile import
- [ ] Multiple resume comparison
- [ ] Skill trend analysis
- [ ] Interview preparation module
- [ ] Mobile app version

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🙏 Acknowledgments

- spaCy for NLP capabilities
- HuggingFace for transformer models
- Google Gemini / OpenAI for LLM features
- FastAPI for excellent async API framework
- React and Vite for modern frontend development

---

**Built with ❤️ using AI & NLP**
