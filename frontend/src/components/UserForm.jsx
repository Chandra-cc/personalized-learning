import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { submitUserData } from "../api/api";
import { FaGraduationCap, FaUserAlt, FaChartLine, FaArrowLeft, FaBriefcase, FaClock, FaLightbulb } from "react-icons/fa";
import "../styles/animations.css";
import axios from 'axios';

const suggestions = {
  education: ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Self-Taught", "Bootcamp"],
  goal: ["Data Scientist", "Software Engineer", "AI Researcher", "Product Manager", "UX Designer", "Entrepreneur"],
};

// Memoized Input Component
const FormInput = memo(({ icon: Icon, label, ...props }) => (
  <div className="relative">
    <label className="text-sm text-gray-300 mb-1 block">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon />
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 bg-gray-900 rounded-xl text-gray-300 
                   border border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 
                   focus:border-transparent placeholder-gray-500 transition-all duration-300
                   shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                   hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]"
      />
    </div>
  </div>
));

FormInput.displayName = 'FormInput';

// Memoized Suggestions List
const SuggestionsList = memo(({ show, options, filter, onSelect }) => {
  if (!show) return null;

  return (
    <ul className="absolute z-20 w-full mt-1 rounded-xl shadow-xl border border-gray-900 
                   bg-gray-900 overflow-hidden">
      {options
        .filter((option) => option.toLowerCase().includes(filter.toLowerCase()))
        .map((option, idx) => (
          <li
            key={idx}
            className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200
                       text-gray-300 hover:text-gray-200 border-b border-gray-800 last:border-0"
            onClick={() => onSelect(option)}
          >
            {option}
          </li>
        ))}
    </ul>
  );
});

SuggestionsList.displayName = 'SuggestionsList';

const UserForm = ({ userId, onSubmitSuccess, onBackHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    age: '',
    gender: '',
    education: '',
    goal: '',

    // Professional Context
    current_role: '',
    years_of_experience: '',
    industry: '',
    career_goals: [],
    
    // Learning Preferences
    learning_style: '',
    difficulty_preference: '',
    preferred_content_types: [],
    preferred_session_duration: 30,
    learning_environment: '',
    
    // Time and Availability
    available_hours_per_week: '',
    preferred_learning_time: '',
    daily_goal_minutes: 60,
    preferred_deadline: '',
    
    // Prior Knowledge
    education_level: '',
    certifications: [],
    skills_self_assessment: {},
    
    // Learning Style Details
    collaboration_preference: '',
    mentorship_interest: false,
    preferred_teaching_styles: [],
    
    // Technical Context
    preferred_tools: [],
    device_constraints: {},
    accessibility_needs: [],
    
    // Motivation and Goals
    motivation_factors: [],
    interests: []
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState({ education: false, goal: false });

  const educationRef = useRef(null);
  const goalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (educationRef.current && !educationRef.current.contains(event.target)) {
        setShowSuggestions((s) => ({ ...s, education: false }));
      }
      if (goalRef.current && !goalRef.current.contains(event.target)) {
        setShowSuggestions((s) => ({ ...s, goal: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const fetchRecommendations = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/recommendations/${userId}`);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Validate required fields
      const requiredFields = ['age', 'gender', 'goal'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      const response = await axios.post('http://localhost:5000/submit-user-data', {
        user_id: userId,
        ...formData
      });

      setMessage(response.data.message || `Welcome aboard! Your personalized learning journey as a ${formData.goal} begins now 🚀`);
      
      // Fetch recommendations after successful submission
      await fetchRecommendations(userId);
      
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || "Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent unnecessary API calls when changing steps
  const handleStepChange = (direction) => {
    if (direction === 'next' && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else if (direction === 'prev' && currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Professional Context</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Current Role</label>
                <input
                  type="text"
                  name="current_role"
                  value={formData.current_role}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Career Goals (comma-separated)</label>
                <input
                  type="text"
                  name="career_goals"
                  value={formData.career_goals.join(', ')}
                  onChange={(e) => handleArrayInput('career_goals', e.target.value)}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Learning Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Learning Style</label>
                <select
                  name="learning_style"
                  value={formData.learning_style}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                >
                  <option value="">Select Style</option>
                  <option value="visual">Visual</option>
                  <option value="auditory">Auditory</option>
                  <option value="reading_writing">Reading/Writing</option>
                  <option value="kinesthetic">Kinesthetic</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Preferred Content Types (comma-separated)</label>
                <input
                  type="text"
                  name="preferred_content_types"
                  value={formData.preferred_content_types.join(', ')}
                  onChange={(e) => handleArrayInput('preferred_content_types', e.target.value)}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                  placeholder="video, text, interactive, project-based"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Session Duration (minutes)</label>
                <input
                  type="number"
                  name="preferred_session_duration"
                  value={formData.preferred_session_duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Goals and Learning Path</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Primary Learning Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                >
                  <option value="">Select Goal</option>
                  <option value="Become a Data Scientist">Become a Data Scientist</option>
                  <option value="Become a Web Developer">Become a Web Developer</option>
                  <option value="Master Machine Learning">Master Machine Learning</option>
                  <option value="Learn Cloud Computing">Learn Cloud Computing</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Difficulty Preference</label>
                <select
                  name="difficulty_preference"
                  value={formData.difficulty_preference}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                >
                  <option value="">Select Difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Available Hours per Week</label>
                <input
                  type="number"
                  name="available_hours_per_week"
                  value={formData.available_hours_per_week}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black 
                    text-gray-300 px-4 py-10 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center relative">
          <button
            type="button"
            onClick={onBackHome}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-gray-900 
                       transition-colors duration-200 group"
          >
            <FaArrowLeft className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200" />
          </button>
          
          <h1 className="text-4xl font-bold text-gray-300">
            E-learning.ai
          </h1>
          <p className="mt-3 text-gray-400">Design your personalized learning experience</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl border border-gray-900 p-8 
                      shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                      hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Step {currentStep} of 4</h2>
              <div className="h-2 bg-gray-800 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => handleStepChange('prev')}
                  className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange('next')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Your Journey..." : "Start Learning"}
                </button>
              )}
            </div>
        </form>

        {message && (
            <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 
                          text-center animate-fade-in
                          shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]">
            {message}
            </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-300">Personalized Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-900 border border-gray-800 
                                        shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]">
                  <h4 className="font-bold text-gray-300">{rec.title}</h4>
                  <p className="text-gray-400 mt-2">{rec.description}</p>
                  {rec.resource_url && (
                    <a href={rec.resource_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
                      View Resource →
                    </a>
                  )}
                  <p className="text-sm text-gray-500 mt-2">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
            <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 
                          text-center animate-fade-in
                          shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]">
              <p>{error}</p>
              <button
                type="button"
                onClick={onBackHome}
                className="mt-3 text-sm text-gray-300 hover:text-gray-500 transition-colors duration-200"
              >
                Return to homepage
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

UserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onBackHome: PropTypes.func.isRequired,
};

export default memo(UserForm);
