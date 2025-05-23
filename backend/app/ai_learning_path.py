import json
from typing import List, Dict, Any
from .models import User, UserPreferences, StepProgress
from .learning_paths import learning_path_templates
import os
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from sqlalchemy import func
import numpy as np
from datetime import datetime, timedelta

class AILearningPathGenerator:
    def __init__(self, user_id: int):
        self.user_id = user_id
        self.user = User.query.get(user_id)
        self.preferences = UserPreferences.query.filter_by(user_id=user_id).first()
        # Initialize the model and tokenizer
        self.model_name = "facebook/opt-350m"  # A smaller but effective model
        try:
            self.generator = pipeline(
                "text-generation",
                model=self.model_name,
                tokenizer=self.model_name,
                device="cpu"  # Use CPU by default, can be changed to "cuda" for GPU
            )
        except Exception as e:
            print(f"Error initializing AI model: {str(e)}")
            self.generator = None

    def _get_user_context(self) -> Dict[str, Any]:
        """Generate a comprehensive user context for AI."""
        context = {
            "professional_context": {
                "current_role": self.preferences.current_role,
                "years_of_experience": self.preferences.years_of_experience,
                "industry": self.preferences.industry,
                "career_goals": json.loads(self.preferences.career_goals or "[]")
            },
            "learning_preferences": {
                "style": self.preferences.learning_style,
                "difficulty": self.preferences.difficulty_preference,
                "content_types": json.loads(self.preferences.preferred_content_types or "[]"),
                "session_duration": self.preferences.preferred_session_duration,
                "environment": self.preferences.learning_environment
            },
            "constraints": {
                "available_hours_per_week": self.preferences.available_hours_per_week,
                "preferred_deadline": str(self.preferences.preferred_deadline) if self.preferences.preferred_deadline else None,
                "accessibility_needs": json.loads(self.preferences.accessibility_needs or "[]")
            },
            "prior_knowledge": {
                "education": self.preferences.education_level,
                "certifications": json.loads(self.preferences.certifications or "[]"),
                "skills": json.loads(self.preferences.skills_self_assessment or "{}")
            }
        }
        return context

    def generate_personalized_path(self, goal: str) -> List[Dict[str, Any]]:
        """Generate a personalized learning path using AI."""
        if not self.generator:
            return learning_path_templates.get(goal, [])

        user_context = self._get_user_context()
        base_path = learning_path_templates.get(goal, [])

        # Prepare prompt for the model
        prompt = f"""
        Task: Enhance a learning path based on user context and preferences.

        User Context:
        {json.dumps(user_context, indent=2)}

        Learning Goal: {goal}

        Base Learning Path:
        {json.dumps(base_path[:2], indent=2)}  # Only show first 2 steps as example

        Instructions:
        1. Adjust difficulty based on user's prior knowledge: {user_context['prior_knowledge']['education']}
        2. Consider user's learning style: {user_context['learning_preferences']['style']}
        3. Match content types to preferences: {', '.join(user_context['learning_preferences']['content_types'])}
        4. Align with career goals: {', '.join(user_context['professional_context']['career_goals'])}
        5. Respect time constraints: {user_context['constraints']['available_hours_per_week']} hours/week
        6. Consider accessibility needs: {', '.join(user_context['constraints']['accessibility_needs'])}

        Generate a JSON array of 3 personalized learning steps following this structure:
        {
          "title": "Step Title",
          "duration": "Estimated Duration",
          "description": "Detailed Description",
          "learning_objectives": ["objective1", "objective2"],
          "resources": {"type": "url"},
          "prerequisites": ["prerequisite1"],
          "skills_gained": ["skill1", "skill2"]
        }
        """

        try:
            # Generate text using the model
            response = self.generator(
                prompt,
                max_length=2048,
                num_return_sequences=1,
                temperature=0.7,
                top_p=0.9,
                do_sample=True
            )

            # Extract and parse the generated text
            generated_text = response[0]['generated_text']
            json_start = generated_text.find('[')
            if json_start == -1:
                return base_path[:3]  # Return first 3 steps of base path
                
            json_text = generated_text[json_start:]
            
            try:
                enhanced_path = json.loads(json_text)
                return self._validate_and_clean_path(enhanced_path)
            except json.JSONDecodeError:
                return base_path[:3]
                
        except Exception as e:
            print(f"Error generating AI path: {str(e)}")
            return base_path[:3]

    def _validate_and_clean_path(self, path: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Validate and clean the AI-generated path."""
        required_fields = {'title', 'duration', 'description', 'learning_objectives'}
        
        cleaned_path = []
        for step in path:
            if all(field in step for field in required_fields):
                # Ensure all required fields are strings
                for field in required_fields:
                    if not isinstance(step[field], str):
                        step[field] = str(step[field])
                
                # Ensure arrays are lists
                step['skills_gained'] = step.get('skills_gained', [])
                step['prerequisites'] = step.get('prerequisites', [])
                
                # Ensure resources is a dictionary
                step['resources'] = step.get('resources', {})
                
                cleaned_path.append(step)
                
        return cleaned_path

    def generate_adaptive_recommendations(self) -> List[Dict[str, Any]]:
        """Generate adaptive learning recommendations based on progress and performance."""
        if not self.generator:
            return []

        # Get user's learning history
        completed_steps = StepProgress.query.filter_by(
            user_id=self.user_id,
            completed=True
        ).order_by(StepProgress.completed_at.desc()).all()

        if not completed_steps:
            return []

        # Analyze performance patterns
        performance_data = {
            "avg_comprehension": np.mean([step.comprehension_score for step in completed_steps if step.comprehension_score]),
            "avg_time_spent": np.mean([step.time_spent for step in completed_steps if step.time_spent]),
            "difficult_topics": [step.step_data.get('title') for step in completed_steps if step.difficulty_rating and step.difficulty_rating > 3],
            "strong_areas": [step.step_data.get('title') for step in completed_steps if step.comprehension_score and step.comprehension_score > 80]
        }

        # Prepare prompt for recommendations
        prompt = f"""
        Task: Generate personalized learning recommendations based on user's performance.

        Performance Data:
        - Average comprehension: {performance_data['avg_comprehension']}%
        - Average time per step: {performance_data['avg_time_spent']} minutes
        - Challenging topics: {', '.join(performance_data['difficult_topics'][:3])}
        - Strong areas: {', '.join(performance_data['strong_areas'][:3])}

        User Preferences:
        - Learning style: {self.preferences.learning_style}
        - Available time: {self.preferences.available_hours_per_week} hours/week
        - Preferred content: {', '.join(json.loads(self.preferences.preferred_content_types or '[]'))}

        Generate 3 specific learning recommendations in JSON format:
        [
          {
            "type": "resource",
            "title": "Recommendation Title",
            "description": "Why this is recommended",
            "difficulty": "1-5",
            "estimated_time": "duration",
            "url": "resource_url"
          }
        ]
        """

        try:
            response = self.generator(
                prompt,
                max_length=1024,
                num_return_sequences=1,
                temperature=0.8
            )

            generated_text = response[0]['generated_text']
            json_start = generated_text.find('[')
            if json_start == -1:
                return []

            recommendations = json.loads(generated_text[json_start:])
            return recommendations[:3]  # Return top 3 recommendations
        except Exception as e:
            print(f"Error generating recommendations: {str(e)}")
            return []

    def generate_skill_gap_analysis(self) -> Dict[str, Any]:
        """Analyze skill gaps based on career goals and current progress."""
        if not self.generator:
            return {}

        # Get user's current skills and goals
        current_skills = json.loads(self.preferences.skills_self_assessment or "{}")
        career_goals = json.loads(self.preferences.career_goals or "[]")
        completed_steps = StepProgress.query.filter_by(
            user_id=self.user_id,
            completed=True
        ).all()

        # Extract skills gained from completed steps
        gained_skills = []
        for step in completed_steps:
            if step.step_data and 'skills_gained' in step.step_data:
                gained_skills.extend(step.step_data['skills_gained'])

        prompt = f"""
        Task: Analyze skill gaps for career goals.

        Current Skills: {', '.join(current_skills.keys())}
        Recently Gained Skills: {', '.join(gained_skills[:10])}
        Career Goals: {', '.join(career_goals)}

        Generate a JSON analysis of skill gaps:
        {{
          "missing_critical_skills": ["skill1", "skill2"],
          "recommended_focus_areas": ["area1", "area2"],
          "skill_improvement_suggestions": [
            {{
              "skill": "skill_name",
              "reason": "why important",
              "resources": ["resource1", "resource2"]
            }}
          ]
        }}
        """

        try:
            response = self.generator(
                prompt,
                max_length=1024,
                num_return_sequences=1,
                temperature=0.7
            )

            generated_text = response[0]['generated_text']
            json_start = generated_text.find('{')
            if json_start == -1:
                return {}

            analysis = json.loads(generated_text[json_start:])
            return analysis
        except Exception as e:
            print(f"Error generating skill gap analysis: {str(e)}")
            return {} 