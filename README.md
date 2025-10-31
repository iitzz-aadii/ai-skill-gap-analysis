# 🚀 AI Skill Gap Analyzer

### Intelligent Resume Analysis & Career Advancement Platform

> **Transform your career journey with AI-powered skill gap analysis, personalized learning paths, and intelligent coaching.**

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI_Powered-FF6B6B?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

---

## 🎯 What Makes This Special?

**AI Skill Gap Analyzer** is a cutting-edge, full-stack application that bridges the gap between where you are and where you want to be in your career. Using advanced NLP, machine learning, and large language models, it provides actionable insights to accelerate your professional growth.

### 💡 **The Problem We Solve**

- Job seekers struggle to identify exactly which skills they're missing
- Resume optimization is time-consuming and often inaccurate
- Career transitions require knowing what to learn and in what order
- Generic advice doesn't account for individual backgrounds

### ✨ **Our Solution**

- **Instant Analysis**: Upload resume + job description → Get detailed gap analysis in seconds
- **AI-Powered Insights**: Leverages Google Gemini/OpenAI for intelligent recommendations
- **Personalized Learning**: Custom roadmaps with curated resources for each skill
- **Real-Time Progress**: Track your improvement journey with visual dashboards
- **Smart Coaching**: Interactive AI chatbot provides contextual career advice

---

## 🌟 Key Features

### **Core Capabilities**

| Feature                         | Description                                               | Tech                            |
| ------------------------------- | --------------------------------------------------------- | ------------------------------- |
| 📄 **Smart Resume Upload**      | Support for PDF, DOCX, TXT + direct text paste            | PyPDF2, python-docx, pdfplumber |
| 🎯 **AI Skill Extraction**      | Advanced NLP extracts 100+ technical skills automatically | spaCy, pattern matching         |
| 📊 **Intelligent Matching**     | Semantic similarity + exact matching for accuracy         | Sentence-BERT, transformers     |
| 💯 **Dual Scoring System**      | Skill match % + Profile fit score (0-100)                 | Custom ML algorithms            |
| 🚀 **Personalized Roadmaps**    | Priority-based learning paths with time estimates         | LLM-powered generation          |
| 📚 **Resource Recommendations** | Curated courses, tutorials, and projects per skill        | Multi-source aggregation        |
| ✍️ **Resume Enhancement**       | AI-generated tips to optimize your resume                 | Google Gemini / OpenAI GPT      |
| 💬 **AI Career Coach**          | Context-aware chatbot for upskilling guidance             | LangChain-inspired architecture |
| 📈 **Progress Tracking**        | Monitor learning journey with visual indicators           | Real-time dashboard             |
| 💾 **Analysis History**         | Save and compare multiple analyses over time              | MongoDB persistence             |

### **🎨 User Experience Highlights**

- ⚡ **Real-Time Progress Tracking**: See analysis progress with percentage completion
- 🎯 **Feature-Specific Progress**: Individual indicators for Skill Matching, Gap Analysis, Learning Paths
- 🎨 **Professional UI**: Modern design with Primary Blue (#007BFF) and Charcoal (#343A40) theme
- 📱 **Fully Responsive**: Works flawlessly on desktop, tablet, and mobile
- ⚡ **Blazing Fast**: Vite + FastAPI for optimal performance

---

## 🏗️ Architecture & Tech Stack

### **Frontend** (React Ecosystem)

```yaml
Framework: React 18.2 with Vite 5.0
Styling: TailwindCSS 3.3 + Custom Design System
Routing: React Router 6.20
State: Context API + Hooks
HTTP: Axios with interceptors
Icons: Lucide React (300+ icons)
Charts: Recharts for data visualization
Deploy: Vercel / Nginx (production-ready)
```

### **Backend** (Python FastAPI)

```yaml
Framework: FastAPI 0.104 (async/await)
Server: Uvicorn (ASGI)
Validation: Pydantic 2.5
Database ODM: Beanie 1.23 + Motor 3.3
Auth: JWT + passlib (bcrypt)
File Processing: aiofiles (async I/O)
CORS: Full configuration support
```

### **AI/ML Pipeline**

```yaml
NLP Engine: spaCy 3.7 (en_core_web_sm)
Embeddings: Sentence-Transformers 2.2 (all-MiniLM-L6-v2)
Similarity: Cosine similarity (numpy-optimized)
LLM: Google Gemini 1.5 Flash / OpenAI GPT-3.5
Skill Database: 100+ curated technical skills
Semantic Matching: Transformer-based (threshold: 0.8)
```

### **Data Layer**

```yaml
Database: MongoDB 7.0 (NoSQL)
Connection: Async Motor driver
ODM: Beanie for document modeling
Models: User, Analysis, Progress, ChatHistory
Indexing: Optimized queries
```

### **DevOps**

```yaml
Containerization: Docker + Docker Compose
Web Server: Nginx (production frontend)
Caching: In-memory + Redis-ready
CI/CD: GitHub Actions compatible
Monitoring: Health check endpoints
```

---

## 📋 Prerequisites

- **Python 3.11+**
- **Node.js 18+** and npm
- **MongoDB** (local or Docker)
- **Git**
- **API Keys**: Google Gemini or OpenAI (optional but recommended for full features)

## ⚡ Quick Start (3 Minutes)

### **Option 1: Instant Local Setup** (Windows)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-skill-gap-analysis.git
cd ai-skill-gap-analysis

# 2. Run automated setup
setup.bat

# 3. Add your API key (optional but recommended)
# Edit backend\.env and add:
GEMINI_API_KEY=your_actual_key_here

# 4. Start both servers
start.bat

# ✅ Done! Open http://localhost:5173
```

### **Option 2: Docker Compose** (Cross-Platform)

```bash
# 1. Clone & configure
git clone https://github.com/yourusername/ai-skill-gap-analysis.git
cd ai-skill-gap-analysis
cp backend/.env.example backend/.env

# 2. Add API key to backend/.env
GEMINI_API_KEY=your_actual_key_here

# 3. Launch with Docker
docker-compose up -d

# ✅ Access at http://localhost
```

### **Option 3: Manual Setup** (Linux/Mac)

<details>
<summary><b>Click to expand detailed setup</b></summary>

**Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cp .env.example .env
# Edit .env with your keys
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

**MongoDB:**

```bash
# Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or install from https://www.mongodb.com/try/download/community
```

</details>

---

## 🎮 How To Use

### **1️⃣ Analyze Your Profile**

1. **Navigate** to http://localhost:5173
2. **Choose input method**:
   - 📎 Upload resume (PDF/DOCX/TXT) via drag-and-drop
   - ⌨️ Or paste resume text directly
3. **Paste job description** from your target role
4. **Click** "Analyze My Profile" button
5. **Watch real-time progress**:
   - 🔍 Extracting skills from resume... (30%)
   - 🎯 Analyzing job requirements... (45%)
   - 📊 Calculating skill match... (65%)
   - 🤖 Generating AI recommendations... (75%)
   - ✅ Analysis complete! (100%)

### **2️⃣ Review Detailed Results**

Your personalized dashboard shows:

| Section                     | What You Get                                        |
| --------------------------- | --------------------------------------------------- |
| **🎯 Profile Fit Score**    | 0-100 score showing overall compatibility           |
| **📊 Skill Match %**        | Percentage of required skills you possess           |
| **✅ Matched Skills**       | Green badges for skills you already have            |
| **❌ Missing Skills**       | Red badges (high priority) to orange (low priority) |
| **📈 Skills to Strengthen** | Skills you have but need more experience            |
| **🚀 Learning Roadmap**     | Step-by-step guide for each skill gap               |
| **📚 Resource Links**       | Curated courses, tutorials, projects                |
| **✍️ Resume Tips**          | AI-generated suggestions to optimize your resume    |

### **3️⃣ Get AI Career Coaching**

1. **Click** "AI Coach" in navigation
2. **Ask questions** like:
   - "What should I learn first to become an AI engineer?"
   - "How long will it take to learn PyTorch?"
   - "What projects should I build for my portfolio?"
   - "How can I transition from web dev to ML engineering?"
3. **Receive** context-aware, personalized advice

### **4️⃣ Track Your Progress**

- Add skills you're actively learning
- Update completion percentage as you progress
- View visual progress dashboard
- Celebrate milestones! 🎉

---

## 🔑 Configuration

### **Environment Variables**

Create `backend/.env` from the template:

```bash
# ========================================
# API KEYS (Get free keys from links below)
# ========================================

# Google Gemini (Recommended - Free tier: 60 requests/minute)
# Get key: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIza...

# OpenAI (Alternative - Paid after $5 credit)
# Get key: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# ========================================
# DATABASE
# ========================================

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017

# MongoDB Atlas (Cloud - Free 512MB)
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/skill_gap_analyzer

DATABASE_NAME=skill_gap_analyzer

# ========================================
# APPLICATION
# ========================================

ENVIRONMENT=development
DEBUG=True
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=10485760  # 10MB

# ========================================
# AI/ML SETTINGS
# ========================================

USE_GEMINI=True
MODEL_NAME=gemini-1.5-flash  # or gemini-pro
SIMILARITY_THRESHOLD=0.7

# ========================================
# SECURITY (Production)
# ========================================

# Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))"
JWT_SECRET_KEY=CHANGE-THIS-IN-PRODUCTION

# CORS_ORIGINS=["https://your-domain.com"]
```

### **Getting Free API Keys**

**🔑 Google Gemini** (Recommended):

1. Visit https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and add to `.env`
4. ✅ **Free tier**: 60 requests/minute

**🔑 OpenAI** (Alternative):

1. Visit https://platform.openai.com/api-keys
2. Create account ($5 free credit for new users)
3. Generate API key
4. Copy and add to `.env`

⚠️ **Note**: App works without API keys using fallback responses, but LLM features (resume tips, AI chat) will be limited.

---

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

## 📚 API Reference

### **Interactive Documentation**

Once backend is running:

- **Swagger UI** (recommended): http://localhost:8000/docs
- **ReDoc** (alternative): http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

### **Core Endpoints**

#### **🔍 Analysis API**

```http
POST /api/analysis/analyze
Content-Type: multipart/form-data

Fields:
  - resume_file: File (optional)
  - resume_text: string (optional)
  - job_description: string (required)

Response: AnalysisResult
  - profile_fit_score: float (0-100)
  - skill_match_percentage: float
  - matched_skills: array
  - missing_skills: array
  - learning_roadmap: array
  - resume_suggestions: string
```

#### **🤖 Chat API**

```http
POST /api/chat/message
Content-Type: application/json

Body:
  {
    "user_id": "string",
    "message": "string",
    "context": {} // optional
  }
```

#### **📈 Progress API**

```http
POST /api/progress
PUT /api/progress/{id}
GET /api/progress/{user_id}
DELETE /api/progress/{id}
```

---

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

## 🧠 How It Works (Technical Deep Dive)

### **Pipeline Architecture**

```
graph LR
    A[Resume Upload] --> B[File Processing]
    C[Job Description] --> B
    B --> D[NLP Skill Extraction]
    D --> E[Semantic Matching]
    E --> F[Gap Analysis]
    F --> G[LLM Enhancement]
    G --> H[Results Dashboard]
```

### **Step-by-Step Process**

1. **📄 Document Processing**

   - PDF/DOCX/TXT parsing with multiple fallbacks
   - Text extraction with encoding detection
   - Async file handling for performance

2. **🔍 NLP Skill Extraction**

   - spaCy pipeline for named entity recognition
   - Pattern matching against 100+ curated tech skills
   - Multi-word phrase detection (e.g., "Machine Learning")
   - Contextual filtering to remove false positives

3. **🎯 Intelligent Matching**

   - **Exact Match**: Direct string comparison (case-insensitive)
   - **Semantic Match**: Sentence-BERT embeddings + cosine similarity
   - **Threshold**: 0.8 similarity score for fuzzy matches
   - Example: "React" matches "React.js", "ReactJS"

4. **📊 Gap Analysis**

   - Categorize skills: Matched, Missing, Weak
   - Priority scoring: High/Medium/Low based on:
     - Frequency in job description
     - Keyword context ("required" vs "preferred")
     - Industry importance

5. **🤖 LLM-Powered Enhancement**

   - **Resume Tips**: GPT/Gemini analyzes resume for improvements
   - **Learning Paths**: AI generates personalized roadmaps
   - **Resource Curation**: Intelligent course recommendations
   - **Async Processing**: Non-blocking API calls with timeouts

6. **💾 Data Persistence**
   - MongoDB stores analysis results
   - Async Beanie ODM for efficient queries
   - Historical tracking for progress monitoring

### **AI Models Used**

| Model                       | Purpose             | Performance        |
| --------------------------- | ------------------- | ------------------ |
| **spaCy en_core_web_sm**    | Skill extraction    | ~50ms per document |
| **all-MiniLM-L6-v2**        | Semantic embeddings | ~100ms for pair    |
| **Google Gemini 1.5 Flash** | LLM generation      | ~2-5s per request  |
| **OpenAI GPT-3.5**          | Alternative LLM     | ~1-3s per request  |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### **Common Issues & Solutions**

| Issue                           | Solution                                                           |
| ------------------------------- | ------------------------------------------------------------------ |
| ❌ **Backend won't start**      | Check Python 3.11+ installed, verify MongoDB running, install deps |
| ❌ **MongoDB connection error** | Ensure MongoDB is running on port 27017 or check connection string |
| ❌ **NLP model error**          | Run `python -m spacy download en_core_web_sm`                      |
| ❌ **Frontend build fails**     | Delete `node_modules`, run `npm install` again                     |
| ❌ **CORS errors**              | Check frontend URL in backend CORS settings                        |
| ❌ **Port already in use**      | Change port in config or kill existing process                     |

### **Performance Tips**

✅ Use local MongoDB for development (faster than cloud)  
✅ Enable LLM API keys for best experience  
✅ Clear browser cache if seeing stale data  
✅ Use Chrome DevTools Network tab to debug API calls

---

## 🚀 Deployment (Production)

### **Recommended Free Stack**

- **Frontend**: Vercel (100GB bandwidth/month)
- **Backend**: Render.com (750 hours/month, 7GB Docker limit)
- **Database**: MongoDB Atlas (512MB free tier)

### **Quick Deploy to Render**

1. Push code to GitHub
2. Create new Web Service on Render.com
3. Connect repository, set root to `/backend`
4. Add environment variables from `.env`
5. Deploy! Backend URL will be generated
6. Update frontend API URL to point to Render

### **Frontend to Vercel**

```bash
cd frontend
npm run build
npx vercel --prod
```

---

## 💡 Tips for Best Results

1. **📄 Resume Quality**: Use detailed, well-formatted resumes (PDF recommended)
2. **🎯 Complete Job Descriptions**: Include full requirements and responsibilities
3. **🔑 API Keys**: Configure Gemini/OpenAI for enhanced AI features
4. **❓ Specific Questions**: Ask detailed questions in AI chat for better advice
5. **📊 Track Progress**: Regularly update your learning progress

---

## 🏆 What Makes This Project Stand Out

✨ **Production-Ready Architecture**

- Async FastAPI backend with proper error handling
- MongoDB with Beanie ODM for scalable data layer
- Docker containerization for easy deployment

🤖 **Advanced AI Integration**

- Multi-model LLM support (Gemini + OpenAI)
- Semantic similarity using Sentence-BERT
- Context-aware AI coaching chatbot

🎨 **Modern UX Design**

- Real-time progress tracking with percentages
- Feature-specific progress indicators
- Professional color scheme and responsive layout
- Judge-friendly demo experience

⚡ **Performance Optimized**

- Async/await throughout the stack
- Efficient NLP pipelines
- Optimized Docker images (<4GB)
- Fast frontend with Vite

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [spaCy](https://spacy.io/) - Industrial-strength NLP
- [Sentence-Transformers](https://www.sbert.net/) - Semantic text embeddings
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://reactjs.org/) - UI library
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Google Gemini](https://ai.google.dev/) - Large language model
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-skill-gap-analysis/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-skill-gap-analysis/discussions)
- **Email**: your.email@example.com

---

<div align="center">

**⭐ Star this repo if you find it useful!**

**Built with ❤️ using AI, NLP, and Modern Web Technologies**

[Demo](https://your-demo-url.com) • [Documentation](https://github.com/yourusername/ai-skill-gap-analysis) • [Report Bug](https://github.com/yourusername/ai-skill-gap-analysis/issues)

</div>
