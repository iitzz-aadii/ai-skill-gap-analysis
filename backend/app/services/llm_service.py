import os
from typing import Optional, List, Dict
from app.config import settings


class LLMService:
    """Service for LLM-based content generation"""
    
    def __init__(self):
        self.use_gemini = settings.use_gemini
        self.client = None
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize LLM client"""
        try:
            if self.use_gemini and settings.gemini_api_key:
                import google.generativeai as genai
                genai.configure(api_key=settings.gemini_api_key)
                self.client = genai.GenerativeModel(settings.model_name)
                print("Gemini LLM initialized")
            elif settings.openai_api_key:
                from openai import OpenAI
                self.client = OpenAI(api_key=settings.openai_api_key)
                print("OpenAI LLM initialized")
            else:
                print("Warning: No LLM API key configured. Using fallback responses.")
        except Exception as e:
            print(f"Error initializing LLM: {e}")
            self.client = None
    
    async def generate_resume_rewrite_suggestions(
        self, 
        resume_text: str, 
        job_description: str,
        missing_skills: List[str]
    ) -> str:
        """Generate resume rewrite suggestions (optimized for speed)"""
        if not self.client:
            return self._fallback_resume_suggestions(missing_skills)
        
        # Shortened prompt for faster processing
        prompt = f"""As a resume expert, provide 3 specific tips to improve this resume for the job.

Missing Skills: {', '.join(missing_skills[:3])}

Tips:
1. How to highlight relevant experience
2. Keywords to add
3. Skills section improvements

Be brief and actionable."""

        try:
            response = await self._call_llm(prompt)
            return response
        except Exception as e:
            print(f"Error generating resume suggestions: {e}")
            return self._fallback_resume_suggestions(missing_skills)
    
    async def generate_learning_roadmap(
        self, 
        skill: str, 
        current_level: str,
        target_level: str,
        timeframe: str
    ) -> Dict[str, any]:
        """Generate personalized learning roadmap for a skill"""
        if not self.client:
            return self._fallback_learning_roadmap(skill)
        
        prompt = f"""Create a detailed learning roadmap for someone who wants to learn {skill}.

Current Level: {current_level}
Target Level: {target_level}
Timeframe: {timeframe}

Provide a structured learning path with:
1. Week-by-week breakdown
2. Specific topics to cover
3. Practical projects to build
4. Resources and tools to use
5. Milestones to track progress

Format as a clear, actionable plan."""

        try:
            response = await self._call_llm(prompt)
            return {
                'skill': skill,
                'roadmap': response,
                'timeframe': timeframe
            }
        except Exception as e:
            print(f"Error generating learning roadmap: {e}")
            return self._fallback_learning_roadmap(skill)
    
    async def chat_response(
        self, 
        user_message: str, 
        context: Optional[Dict] = None,
        chat_history: Optional[List[Dict]] = None
    ) -> str:
        """Generate chat response for upskilling advice"""
        if not self.client:
            return self._fallback_chat_response(user_message)
        
        # Build context from analysis if available
        context_text = ""
        if context:
            context_text = f"""
User's Profile Context:
- Skill Match: {context.get('skill_match_percentage', 'N/A')}%
- Missing Skills: {', '.join(context.get('missing_skills', [])[:5])}
- Career Goal: {context.get('job_title', 'Not specified')}
"""
        
        # Build chat history
        history_text = ""
        if chat_history:
            history_text = "\n".join([
                f"{msg['role']}: {msg['content']}" 
                for msg in chat_history[-5:]  # Last 5 messages
            ])
        
        prompt = f"""You are an AI career coach specializing in skill development and career growth.
Help the user with personalized advice about upskilling, career transitions, and learning strategies.

{context_text}

{history_text}

User: {user_message}

Provide helpful, encouraging, and actionable advice. Be specific and practical."""

        try:
            response = await self._call_llm(prompt)
            return response
        except Exception as e:
            print(f"Error generating chat response: {e}")
            return self._fallback_chat_response(user_message)
    
    async def enhance_improvement_suggestions(
        self,
        skill: str,
        base_suggestions: List[str]
    ) -> List[str]:
        """Enhance improvement suggestions with LLM"""
        if not self.client:
            return base_suggestions
        
        prompt = f"""Enhance these learning suggestions for {skill}:

{chr(10).join(f'{i+1}. {s}' for i, s in enumerate(base_suggestions))}

Make them more specific, actionable, and motivating. Add concrete examples and tips."""

        try:
            response = await self._call_llm(prompt)
            # Parse response into list
            enhanced = [s.strip() for s in response.split('\n') if s.strip() and not s.strip().isdigit()]
            return enhanced[:len(base_suggestions)] if enhanced else base_suggestions
        except Exception as e:
            print(f"Error enhancing suggestions: {e}")
            return base_suggestions
    
    async def _call_llm(self, prompt: str) -> str:
        """Call the LLM API"""
        import asyncio
        
        def sync_gemini_call():
            response = self.client.generate_content(prompt)
            return response.text
        
        def sync_openai_call():
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful career coach and skill development expert."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            return response.choices[0].message.content
        
        if self.use_gemini and hasattr(self.client, 'generate_content'):
            # Gemini API - run in executor to avoid blocking
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, sync_gemini_call)
        elif hasattr(self.client, 'chat'):
            # OpenAI API - run in executor to avoid blocking
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, sync_openai_call)
        else:
            raise Exception("No valid LLM client available")
    
    # Fallback methods when LLM is not available
    def _fallback_resume_suggestions(self, missing_skills: List[str]) -> str:
        """Fallback resume suggestions"""
        suggestions = f"""Resume Improvement Suggestions:

1. **Add Missing Skills**: Consider adding these skills to your resume if you have any experience with them:
   {', '.join(missing_skills[:5])}

2. **Optimize Keywords**: Ensure these keywords appear in relevant sections of your resume.

3. **Quantify Achievements**: Add metrics and numbers to demonstrate impact.

4. **Tailor Summary**: Update your professional summary to align with the job requirements.

5. **Highlight Relevant Projects**: Showcase projects that demonstrate skills needed for this role.

Note: For personalized AI-powered suggestions, please configure an LLM API key."""
        return suggestions
    
    def _fallback_learning_roadmap(self, skill: str) -> Dict[str, any]:
        """Fallback learning roadmap"""
        return {
            'skill': skill,
            'roadmap': f"""Learning Roadmap for {skill}:

Week 1-2: Foundations
- Study core concepts and fundamentals
- Complete beginner tutorials

Week 3-4: Hands-on Practice
- Build small projects
- Practice with exercises

Week 5-6: Intermediate Level
- Explore advanced topics
- Work on larger projects

Week 7-8: Mastery
- Build portfolio project
- Contribute to open source

Note: For personalized AI-powered roadmaps, please configure an LLM API key.""",
            'timeframe': '8 weeks'
        }
    
    def _fallback_chat_response(self, user_message: str) -> str:
        """Fallback chat response"""
        responses = {
            'how': "To learn effectively, focus on hands-on practice and building projects. Start with fundamentals and gradually increase complexity.",
            'what': "The most important skills depend on your career goals. Focus on in-demand skills in your target industry.",
            'when': "The best time to start learning is now! Even 30 minutes a day can lead to significant progress.",
            'where': "Great learning resources include Coursera, Udemy, freeCodeCamp, and official documentation.",
        }
        
        # Simple keyword matching
        user_lower = user_message.lower()
        for keyword, response in responses.items():
            if keyword in user_lower:
                return response
        
        return "I'm here to help with your skill development! For personalized AI-powered advice, please configure an LLM API key (Gemini or OpenAI)."


# Singleton instance
llm_service = LLMService()
