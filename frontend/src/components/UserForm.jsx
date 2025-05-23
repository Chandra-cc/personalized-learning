import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/animations.css";
import axios from 'axios';

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
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || "Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
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
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors ml-auto"
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
