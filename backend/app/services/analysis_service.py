from typing import Dict, List
from app.services.nlp_service import nlp_service
from app.models import (
    Skill, SkillGap, AnalysisResult, 
    ImprovementSuggestion, LearningResource
)


class AnalysisService:
    """Service for analyzing resume vs job description"""
    
    def __init__(self):
        self.nlp = nlp_service
    
    async def analyze(self, resume_text: str, job_description: str) -> AnalysisResult:
        """Perform complete analysis"""
        
        # Extract skills from both texts
        resume_skills = self.nlp.extract_skills_from_text(resume_text)
        job_skills = self.nlp.extract_skills_from_text(job_description)
        
        # Get skill names
        resume_skill_names = [s['name'] for s in resume_skills]
        job_skill_names = [s['name'] for s in job_skills]
        
        # Compute skill match
        match_percentage, matched_skill_names, missing_skill_names = self.nlp.compute_skill_match(
            resume_skill_names, 
            job_skill_names
        )
        
        # Compute overall semantic similarity
        overall_similarity = self.nlp.compute_semantic_similarity(
            resume_text, 
            job_description
        )
        
        # Calculate profile fit score (weighted combination)
        profile_fit_score = (match_percentage * 0.7 + overall_similarity * 100 * 0.3)
        
        # Build matched skills list
        matched_skills = [
            Skill(name=name, category=self._get_skill_category(name, job_skills))
            for name in matched_skill_names
        ]
        
        # Build missing skills list
        missing_skills = [
            SkillGap(
                skill=name,
                importance=self._determine_importance(name, job_description),
                current_level=0.0,
                required_level=0.8
            )
            for name in missing_skill_names
        ]
        
        # Identify weak skills (skills in resume but maybe not strong enough)
        weak_skills = self._identify_weak_skills(resume_text, job_description, matched_skills)
        
        # Generate improvement suggestions
        improvement_suggestions = self._generate_improvement_suggestions(
            missing_skills, 
            weak_skills
        )
        
        return AnalysisResult(
            skill_match_percentage=round(match_percentage, 2),
            profile_fit_score=round(profile_fit_score, 2),
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            weak_skills=weak_skills,
            improvement_suggestions=improvement_suggestions,
            analysis_summary=self._generate_summary(
                match_percentage, 
                profile_fit_score,
                len(matched_skills),
                len(missing_skills)
            )
        )
    
    def _get_skill_category(self, skill_name: str, skills_list: List[Dict]) -> str:
        """Get category for a skill"""
        for skill in skills_list:
            if skill['name'].lower() == skill_name.lower():
                return skill.get('category', 'Other')
        return 'Other'
    
    def _determine_importance(self, skill: str, job_description: str) -> str:
        """Determine importance of a skill based on job description"""
        jd_lower = job_description.lower()
        skill_lower = skill.lower()
        
        # Count occurrences
        count = jd_lower.count(skill_lower)
        
        # Check for importance keywords
        importance_keywords = {
            'high': ['required', 'must have', 'essential', 'critical', 'mandatory'],
            'medium': ['preferred', 'should have', 'desired', 'important'],
            'low': ['nice to have', 'plus', 'bonus', 'optional']
        }
        
        # Check context around skill mentions
        for level, keywords in importance_keywords.items():
            for keyword in keywords:
                if keyword in jd_lower:
                    # Check if skill is mentioned near this keyword
                    if skill_lower in jd_lower:
                        return level
        
        # Default based on occurrence count
        if count >= 3:
            return 'high'
        elif count >= 2:
            return 'medium'
        else:
            return 'low'
    
    def _identify_weak_skills(
        self, 
        resume_text: str, 
        job_description: str,
        matched_skills: List[Skill]
    ) -> List[SkillGap]:
        """Identify skills that exist but may need improvement"""
        weak_skills = []
        
        # Extract experience information
        resume_experience = self.nlp.extract_experience_years(resume_text)
        job_experience = self.nlp.extract_experience_years(job_description)
        
        # Compare experience requirements
        for job_skill, required_years in job_experience.items():
            for resume_skill, actual_years in resume_experience.items():
                if (job_skill.lower() in resume_skill.lower() or 
                    resume_skill.lower() in job_skill.lower()):
                    if actual_years < required_years:
                        weak_skills.append(SkillGap(
                            skill=job_skill.title(),
                            required_level=min(required_years / 10, 1.0),
                            current_level=min(actual_years / 10, 1.0),
                            importance='high'
                        ))
        
        return weak_skills
    
    def _generate_improvement_suggestions(
        self, 
        missing_skills: List[SkillGap],
        weak_skills: List[SkillGap]
    ) -> List[ImprovementSuggestion]:
        """Generate improvement suggestions"""
        suggestions = []
        
        # Sort by importance
        all_gaps = missing_skills + weak_skills
        high_priority = [g for g in all_gaps if g.importance == 'high']
        medium_priority = [g for g in all_gaps if g.importance == 'medium']
        low_priority = [g for g in all_gaps if g.importance == 'low']
        
        # Generate suggestions for each
        for gap in high_priority[:5]:  # Top 5 high priority
            suggestions.append(self._create_suggestion(gap, 'high'))
        
        for gap in medium_priority[:3]:  # Top 3 medium priority
            suggestions.append(self._create_suggestion(gap, 'medium'))
        
        for gap in low_priority[:2]:  # Top 2 low priority
            suggestions.append(self._create_suggestion(gap, 'low'))
        
        return suggestions
    
    def _create_suggestion(self, gap: SkillGap, priority: str) -> ImprovementSuggestion:
        """Create an improvement suggestion for a skill gap"""
        skill_lower = gap.skill.lower()
        
        # Generate learning path
        learning_path = self._generate_learning_path(skill_lower)
        
        # Generate sample resources (these would ideally come from an API)
        resources = self._get_sample_resources(skill_lower)
        
        # Estimate time
        estimated_time = self._estimate_learning_time(skill_lower, priority)
        
        return ImprovementSuggestion(
            skill=gap.skill,
            priority=priority,
            learning_path=learning_path,
            resources=resources,
            estimated_time=estimated_time
        )
    
    def _generate_learning_path(self, skill: str) -> List[str]:
        """Generate a learning path for a skill"""
        # This is a simplified version - in production, this could be AI-generated
        common_paths = {
            'python': [
                'Learn Python basics and syntax',
                'Practice with small projects and exercises',
                'Study Python libraries relevant to your field',
                'Build a portfolio project using Python'
            ],
            'react': [
                'Learn JavaScript fundamentals',
                'Understand React basics: components, props, state',
                'Learn React hooks and modern patterns',
                'Build a full React application'
            ],
            'machine learning': [
                'Learn Python and math fundamentals',
                'Study ML algorithms and concepts',
                'Practice with scikit-learn and datasets',
                'Work on ML projects and participate in competitions'
            ]
        }
        
        # Check for specific skill paths
        for key, path in common_paths.items():
            if key in skill:
                return path
        
        # Generic learning path
        return [
            f'Study {skill} fundamentals and core concepts',
            f'Practice with hands-on exercises and tutorials',
            f'Build small projects using {skill}',
            f'Create a portfolio piece demonstrating {skill} proficiency'
        ]
    
    def _get_sample_resources(self, skill: str) -> List[LearningResource]:
        """Get sample learning resources"""
        # In production, this would query actual course APIs
        resources = [
            LearningResource(
                title=f"{skill.title()} Complete Course",
                type="course",
                provider="Coursera",
                duration="4-6 weeks",
                relevance_score=0.9
            ),
            LearningResource(
                title=f"Learn {skill.title()} - Interactive Tutorial",
                type="tutorial",
                provider="freeCodeCamp",
                duration="2-3 weeks",
                relevance_score=0.85
            ),
            LearningResource(
                title=f"{skill.title()} Project Ideas",
                type="project",
                provider="GitHub",
                duration="Varies",
                relevance_score=0.8
            )
        ]
        return resources
    
    def _estimate_learning_time(self, skill: str, priority: str) -> str:
        """Estimate time needed to learn a skill"""
        base_times = {
            'high': '2-3 months',
            'medium': '1-2 months',
            'low': '2-4 weeks'
        }
        return base_times.get(priority, '1-2 months')
    
    def _generate_summary(
        self, 
        match_percentage: float, 
        profile_fit_score: float,
        matched_count: int,
        missing_count: int
    ) -> str:
        """Generate analysis summary"""
        if profile_fit_score >= 80:
            fit_level = "excellent"
        elif profile_fit_score >= 60:
            fit_level = "good"
        elif profile_fit_score >= 40:
            fit_level = "moderate"
        else:
            fit_level = "weak"
        
        summary = f"Your profile shows a {fit_level} fit for this position. "
        summary += f"You match {matched_count} key skills required for the role. "
        
        if missing_count > 0:
            summary += f"There are {missing_count} skills that could strengthen your application. "
            summary += "Focus on the high-priority skills in the improvement suggestions to increase your competitiveness."
        else:
            summary += "You have all the key skills mentioned in the job description!"
        
        return summary


# Singleton instance
analysis_service = AnalysisService()
