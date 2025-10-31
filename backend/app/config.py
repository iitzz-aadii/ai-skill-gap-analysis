from pydantic_settings import BaseSettings
from typing import Optional, List
import os
import json


class Settings(BaseSettings):
    """Application settings"""
    
    # API Keys
    openai_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    
    # Database
    mongodb_uri: str = "mongodb://localhost:27017"
    database_name: str = "skill_gap_analyzer"
    
    # Application
    environment: str = "development"
    debug: bool = True
    upload_dir: str = "uploads"
    max_upload_size: int = 10485760  # 10MB
    port: int = int(os.getenv("PORT", 8000))  # Support Railway/Render dynamic PORT
    
    # AI Model Settings
    use_gemini: bool = True
    model_name: str = "gemini-1.5-flash"
    similarity_threshold: float = 0.7
    
    # CORS
    cors_origins: List[str] = []
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Parse CORS_ORIGINS from environment if it's a JSON string
        cors_env = os.getenv("CORS_ORIGINS")
        if cors_env:
            try:
                self.cors_origins = json.loads(cors_env)
            except json.JSONDecodeError:
                # Fallback: split by comma if not valid JSON
                self.cors_origins = [origin.strip() for origin in cors_env.split(",")]
        else:
            # Default CORS origins for development
            self.cors_origins = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
