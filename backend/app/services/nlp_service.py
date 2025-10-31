import spacy
import re
from typing import List, Dict, Tuple
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


class NLPService:
    """NLP Service for skill extraction and analysis"""
    
    def __init__(self):
        """Initialize NLP models"""
        self.nlp = None
        self.sentence_model = None
        self._initialize_models()
        
        # Common technical skills and tools
        self.tech_skills = {
            'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin', 'r', 'matlab', 'scala',
            'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'fastapi', 'nextjs', 'nuxt', 'svelte',
            'spring', 'hibernate', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'xgboost', 'lightgbm',
            'pandas', 'numpy', 'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'dynamodb', 'cassandra', 'neo4j',
            'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'jenkins', 'gitlab', 'circleci', 'ansible', 'chef', 'puppet',
            'git', 'github', 'jira', 'agile', 'scrum', 'ci/cd', 'rest api', 'graphql', 'soap',
            'html', 'css', 'tailwind', 'bootstrap', 'sass', 'less', 'webpack', 'vite', 'rollup', 'babel',
            'machine learning', 'deep learning', 'nlp', 'computer vision', 'data science', 'artificial intelligence',
            'api', 'microservices', 'oauth', 'jwt', 'websocket', 'grpc', 'rest', 'rpc',
            'hadoop', 'spark', 'kafka', 'rabbitmq', 'nginx', 'apache', 'linux', 'unix', 'bash', 'powershell',
            'mlops', 'devops', 'dataops', 'airflow', 'mlflow', 'kubeflow', 'sagemaker',
            'bert', 'gpt', 'transformer', 'lstm', 'cnn', 'rnn', 'gan',
            'tableau', 'powerbi', 'looker', 'metabase', 'grafana',
            'selenium', 'cypress', 'jest', 'pytest', 'junit', 'mocha', 'chai'
        }
        
        # Words to explicitly exclude from skill extraction
        self.excluded_words = {
            'we', 'you', 'our', 'your', 'the', 'and', 'for', 'with', 'from', 'this', 'that',
            'have', 'has', 'been', 'were', 'was', 'are', 'is', 'am', 'will', 'would', 'should',
            'can', 'could', 'may', 'might', 'must', 'about', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further',
            'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both',
            'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same',
            'so', 'than', 'too', 'very', 'can', 'just', 'should', 'now', 'key', 'role',
            'team', 'work', 'company', 'remote', 'type', 'required', 'preferred', 'strong',
            'knowledge', 'experience', 'proficiency', 'understanding', 'ability', 'skills',
            'qualifications', 'responsibilities', 'designing', 'building', 'developing',
            'stay', 'solid', 'latest', 'collaborative', 'flexible', 'full-time', 'part-time',
            'location', 'salary', 'benefits', 'cover', 'letter', 'resume', 'profile',
            'links', 'about', 'engineer', 'developer', 'scientist', 'analyst', 'manager',
            'what', 'corp', 'inc', 'ltd', 'llc', 'design', 'build', 'monitor', 'master',
            'learning', 'practices', 'solutions', 'products', 'frameworks', 'algorithms',
            'models', 'pipelines', 'platforms', 'tools', 'technologies', 'projects',
            'competitive', 'match', 'environment', 'hardware', 'contribute', 'collaborate',
            'face', 'databases', 'apis', 'open-source', 'big', 'data', 'statistics',
            'mathematics', 'computer', 'science', 'phd', 'master', 'bachelor', 'degree'
        }
        
    def _initialize_models(self):
        """Lazy load NLP models"""
        try:
            # Load spaCy model
            try:
                self.nlp = spacy.load("en_core_web_sm")
            except OSError:
                print("Downloading spaCy model...")
                import os
                os.system("python -m spacy download en_core_web_sm")
                self.nlp = spacy.load("en_core_web_sm")
            
            # Load sentence transformer
            self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
            print("NLP models loaded successfully")
        except Exception as e:
            print(f"Error loading NLP models: {e}")
            
    def extract_skills_from_text(self, text: str) -> List[Dict[str, str]]:
        """Extract ONLY technical skills from text using pattern matching"""
        if not text:
            return []
        
        text_lower = text.lower()
        skills = []
        skills_found = set()
        
        # ONLY extract using predefined tech skills (most reliable)
        for skill in self.tech_skills:
            pattern = r'\b' + re.escape(skill.replace('.', r'\.')) + r's?\b'  # Allow plural
            if re.search(pattern, text_lower, re.IGNORECASE):
                if skill not in skills_found:
                    skills_found.add(skill)
                    skills.append({
                        'name': skill.title(),
                        'category': self._categorize_skill(skill)
                    })
        
        # Extract multi-word compound names like "Machine Learning", "Data Science"
        # Only if they appear with capitalization in original text
        capitalized_phrases = re.findall(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b', text)
        for phrase in capitalized_phrases:
            phrase_lower = phrase.lower()
            if (phrase_lower in self.tech_skills and 
                phrase_lower not in skills_found):
                skills_found.add(phrase_lower)
                skills.append({
                    'name': phrase,
                    'category': self._categorize_skill(phrase_lower)
                })
        
        return skills
    
    def _is_likely_skill(self, text: str) -> bool:
        """Check if text is likely a technical skill"""
        text_lower = text.lower().strip()
        
        # Filter out excluded common words
        if text_lower in self.excluded_words:
            return False
        
        # Must be at least 2 characters
        if len(text_lower) < 2:
            return False
        
        # Filter out pure numbers or single letters
        if text_lower.isdigit() or (len(text_lower) == 1 and text_lower.isalpha()):
            return False
        
        # Filter out common verbs and adjectives that aren't skills
        common_non_skills = {
            'ing', 'ed', 'ly', 'tion', 'ment', 'ness', 'ity', 'ship',
            'working', 'building', 'creating', 'managing', 'leading',
            'senior', 'junior', 'mid', 'level', 'entry'
        }
        
        for suffix in common_non_skills:
            if text_lower.endswith(suffix) and text_lower not in self.tech_skills:
                return False
        
        # Must contain at least one letter
        if not re.search(r'[a-zA-Z]', text):
            return False
        
        # If it's a known tech skill, always include it
        if text_lower in self.tech_skills:
            return True
        
        # Only include capitalized terms that look like technologies (e.g., TensorFlow, PyTorch)
        # Require at least one uppercase letter after the first character for compound names
        if len(text) > 3 and any(c.isupper() for c in text[1:]):
            return True
        
        return False
    
    def _categorize_skill(self, skill: str) -> str:
        """Categorize skill into broad categories"""
        skill_lower = skill.lower()
        
        categories = {
            'Programming Languages': ['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin'],
            'Frontend': ['react', 'angular', 'vue', 'html', 'css', 'tailwind', 'bootstrap', 'sass', 'webpack', 'vite'],
            'Backend': ['node.js', 'express', 'django', 'flask', 'fastapi', 'spring', 'hibernate', '.net'],
            'Database': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'dynamodb', 'cassandra'],
            'DevOps': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'jenkins', 'gitlab', 'ci/cd'],
            'AI/ML': ['tensorflow', 'pytorch', 'keras', 'scikit-learn', 'machine learning', 'deep learning', 'nlp', 'computer vision'],
            'Data Science': ['pandas', 'numpy', 'spark', 'hadoop', 'data science', 'analytics'],
            'Tools': ['git', 'github', 'jira', 'vscode', 'postman']
        }
        
        for category, keywords in categories.items():
            if any(keyword in skill_lower for keyword in keywords):
                return category
        
        return 'Other'
    
    def compute_semantic_similarity(self, text1: str, text2: str) -> float:
        """Compute semantic similarity between two texts"""
        if not self.sentence_model or not text1 or not text2:
            return 0.0
        
        try:
            embeddings = self.sentence_model.encode([text1, text2])
            similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
            return float(similarity)
        except Exception as e:
            print(f"Error computing similarity: {e}")
            return 0.0
    
    def compute_skill_match(self, resume_skills: List[str], job_skills: List[str]) -> Tuple[float, List[str], List[str]]:
        """Compute skill match between resume and job description"""
        if not resume_skills or not job_skills:
            return 0.0, [], job_skills
        
        resume_skills_lower = [s.lower() for s in resume_skills]
        job_skills_lower = [s.lower() for s in job_skills]
        
        matched_skills = []
        missing_skills = []
        
        # Direct matches
        for job_skill in job_skills:
            if job_skill.lower() in resume_skills_lower:
                matched_skills.append(job_skill)
            else:
                # Check for semantic similarity
                found_match = False
                if self.sentence_model:
                    try:
                        job_embedding = self.sentence_model.encode([job_skill])
                        for resume_skill in resume_skills:
                            resume_embedding = self.sentence_model.encode([resume_skill])
                            similarity = cosine_similarity(job_embedding, resume_embedding)[0][0]
                            if similarity > 0.8:  # High similarity threshold
                                matched_skills.append(job_skill)
                                found_match = True
                                break
                    except:
                        pass
                
                if not found_match:
                    missing_skills.append(job_skill)
        
        # Calculate match percentage
        match_percentage = (len(matched_skills) / len(job_skills) * 100) if job_skills else 0.0
        
        return match_percentage, matched_skills, missing_skills
    
    def extract_experience_years(self, text: str) -> Dict[str, int]:
        """Extract years of experience mentioned in text"""
        experience_pattern = r'(\d+)[\+]?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience\s+)?(?:in\s+|with\s+)?([a-zA-Z\s\.\+\-]+)'
        matches = re.finditer(experience_pattern, text.lower())
        
        experience_dict = {}
        for match in matches:
            years = int(match.group(1))
            skill = match.group(2).strip()
            experience_dict[skill] = years
        
        return experience_dict


# Singleton instance
nlp_service = NLPService()
