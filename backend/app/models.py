from datetime import datetime
from typing import List, Optional, Dict
from pydantic import BaseModel, Field, EmailStr
from beanie import Document


class Skill(BaseModel):
    """Individual skill model"""
    name: str
    category: Optional[str] = None
    proficiency: Optional[float] = None  # 0-1 scale


class SkillGap(BaseModel):
    """Skill gap information"""
    skill: str
    required_level: Optional[float] = None
    current_level: Optional[float] = None
    importance: str = "medium"  # low, medium, high


class LearningResource(BaseModel):
    """Learning resource recommendation"""
    title: str
    type: str  # course, project, tutorial, book
    url: Optional[str] = None
    provider: Optional[str] = None
    duration: Optional[str] = None
    relevance_score: Optional[float] = None


class ImprovementSuggestion(BaseModel):
    """Improvement suggestion for a skill"""
    skill: str
    priority: str  # high, medium, low
    learning_path: List[str]
    resources: List[LearningResource] = []
    estimated_time: Optional[str] = None


class AnalysisResult(BaseModel):
    """Complete analysis result"""
    skill_match_percentage: float
    profile_fit_score: float
    matched_skills: List[Skill]
    missing_skills: List[SkillGap]
    weak_skills: List[SkillGap]
    improvement_suggestions: List[ImprovementSuggestion]
    resume_rewrite_suggestions: Optional[str] = None
    analysis_summary: Optional[str] = None


class AnalysisRequest(BaseModel):
    """Analysis request model"""
    resume_text: Optional[str] = None
    job_description: str
    resume_file_path: Optional[str] = None


class UserAnalysis(Document):
    """Stored user analysis in database"""
    user_id: Optional[str] = None
    resume_text: str
    job_description: str
    analysis_result: Dict
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "user_analyses"


class UserProgress(Document):
    """User skill improvement progress"""
    user_id: str
    skill: str
    current_level: float = 0.0
    target_level: float = 1.0
    completed_resources: List[str] = []
    notes: Optional[str] = None
    started_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "user_progress"


class ChatMessage(BaseModel):
    """Chat message model"""
    role: str  # user or assistant
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    """Chat request model"""
    message: str
    context: Optional[Dict] = None  # Analysis context for personalized advice


class User(Document):
    """User account model"""
    email: EmailStr
    username: str
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "users"


class UserCreate(BaseModel):
    """User creation model"""
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    """User login model"""
    email: EmailStr
    password: str


class Token(BaseModel):
    """JWT token model"""
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    """User response model"""
    id: str
    email: str
    username: str
    full_name: Optional[str] = None
    is_active: bool
    created_at: datetime
