import React, { useState, memo, useRef } from "react";
import PropTypes from "prop-types";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import "../styles/animations.css";
import axios from 'axios';

// Helper function to check if a step is complete
const isStepComplete = (formData, step) => {
  switch (step) {
    case 1:
      return formData.age && formData.gender;
    case 2:
      return formData.current_role && formData.industry;
    case 3:
      return formData.learning_style && formData.preferred_content_types.length > 0;
    case 4:
      return formData.goal && formData.difficulty_preference;
    default:
      return false;
  }
};

const goalOptions = [
  "Become a Data Scientist",
  "Become a Web Developer",
  "Become a UI/UX Designer",
  "Become a Product Manager",
  "Become an Ethical Hacker",
  "Become a Mobile App Developer",
  "Become a Data Analyst",
  "Become a Software Engineer",
  "Become a Digital Marketer",
  "Become a Cybersecurity Specialist",
  "Become a Machine Learning Engineer",
  "Become a DevOps Engineer",
  "Become a Cloud Engineer",
  "Become an AI Product Manager",
  "Become a Data Engineer",
  "Become a Frontend Engineer",
  "Become a Backend Engineer",
  "Become a Blockchain Developer",
  "Become a Cybersecurity Analyst"
];

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
  const [inputValues, setInputValues] = useState({
    career_goals: '',
    preferred_content_types: ''
  });

  const [goalInput, setGoalInput] = useState("");
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const goalInputRef = useRef(null);

  const filteredGoals = goalOptions.filter(option =>
    option.toLowerCase().includes(goalInput.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update the temporary input value
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Update the form data with split array
    if (value.trim()) {
      const items = value
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      setFormData(prev => ({
        ...prev,
        [name]: items
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: []
      }));
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
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || "Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const progress = ((currentStep - 1) / 3) * 100;
    
    return (
      <div className="mb-12 relative">
        {/* Labels */}
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => {
            const isActive = step <= currentStep;
            const isCurrent = step === currentStep;
            
            return (
              <div 
                key={step}
                className={`text-sm font-medium transition-all duration-300 
                  ${isCurrent ? 'text-indigo-400 transform scale-105' : 
                    isActive ? 'text-gray-300' : 'text-gray-500'}`}
              >
                {step === 1 ? 'Basic Info' :
                 step === 2 ? 'Professional' :
                 step === 3 ? 'Learning Style' :
                 'Goals'}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out
                       bg-gradient-to-r from-violet-600 via-indigo-400 to-cyan-400
                       animate-gradient-x bg-[length:200%_100%]"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(129, 140, 248, 0.3)'
            }}
          />
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0% { background-position: 0% 0; }
            100% { background-position: -200% 0; }
          }
          .animate-gradient-x {
            animation: gradient-x 4s linear infinite;
          }
        `}</style>
      </div>
    );
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
                  placeholder="e.g. Junior Developer"
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
                  min="0"
                  step="0.5"
                  placeholder="e.g. 2.5"
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
                  placeholder="e.g. Technology, Healthcare"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Career Goals
                  <span className="text-sm text-gray-400 ml-2">(separate with commas)</span>
                </label>
                <input
                  type="text"
                  name="career_goals"
                  value={inputValues.career_goals || formData.career_goals.join(', ')}
                  onChange={handleArrayInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                  placeholder="e.g. Lead Developer, Tech Architect, Start a Company"
                />
                {formData.career_goals.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.career_goals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-300"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                )}
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
                <label className="block text-gray-300 mb-2">
                  Preferred Content Types
                  <span className="text-sm text-gray-400 ml-2">(separate with commas)</span>
                </label>
                <input
                  type="text"
                  name="preferred_content_types"
                  value={inputValues.preferred_content_types || formData.preferred_content_types.join(', ')}
                  onChange={handleArrayInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                  placeholder="e.g. video, text, interactive, project-based"
                />
                {formData.preferred_content_types.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.preferred_content_types.map((type, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-300"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Session Duration (minutes)</label>
                <input
                  type="number"
                  name="preferred_session_duration"
                  value={formData.preferred_session_duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                  min="15"
                  max="180"
                  step="15"
                  placeholder="e.g. 30, 45, 60"
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
                <div className="relative">
                  <input
                    type="text"
                    name="goal"
                    autoComplete="off"
                    ref={goalInputRef}
                    value={goalInput || formData.goal}
                    onChange={e => {
                      setGoalInput(e.target.value);
                      setShowGoalDropdown(true);
                      handleInputChange(e);
                    }}
                    onFocus={() => setShowGoalDropdown(true)}
                    onBlur={() => setTimeout(() => setShowGoalDropdown(false), 150)}
                    placeholder="Type to search your goal..."
                    className="w-full bg-gray-800 rounded-xl px-4 py-3 text-gray-100"
                  />
                  {showGoalDropdown && filteredGoals.length > 0 && (
                    <ul className="absolute z-10 w-full bg-gray-900 border border-gray-700 rounded-xl mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {filteredGoals.map(option => (
                        <li
                          key={option}
                          onMouseDown={() => {
                            setFormData(prev => ({ ...prev, goal: option }));
                            setGoalInput(option);
                            setShowGoalDropdown(false);
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white ${formData.goal === option ? 'bg-indigo-700 text-white' : 'text-gray-200'}`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {formData.goal && (
                  <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="text-sm text-gray-400">
                      {formData.goal === "Become a Data Scientist" && (
                        <>
                          <p className="mb-2">Master Python, statistics, and machine learning to analyze data and build predictive models.</p>
                          <p>🎯 Key Skills: Python, Statistics, Machine Learning, Data Analysis</p>
                          <p>⏱️ Estimated Duration: 5-6 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a Web Developer" && (
                        <>
                          <p className="mb-2">Learn frontend and backend development to build modern web applications.</p>
                          <p>🎯 Key Skills: HTML/CSS, JavaScript, React, Node.js</p>
                          <p>⏱️ Estimated Duration: 5-6 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a UI/UX Designer" && (
                        <>
                          <p className="mb-2">Master design principles and tools to create beautiful, user-friendly interfaces.</p>
                          <p>🎯 Key Skills: UI Design, UX Research, Figma, Design Systems</p>
                          <p>⏱️ Estimated Duration: 4-5 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a Product Manager" && (
                        <>
                          <p className="mb-2">Learn to lead product development and drive business success.</p>
                          <p>🎯 Key Skills: Product Strategy, Agile, User Research, Analytics</p>
                          <p>⏱️ Estimated Duration: 6-7 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become an Ethical Hacker" && (
                        <>
                          <p className="mb-2">Learn cybersecurity and ethical hacking techniques to protect systems.</p>
                          <p>🎯 Key Skills: Network Security, Penetration Testing, Security Tools</p>
                          <p>⏱️ Estimated Duration: 6 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a Mobile App Developer" && (
                        <>
                          <p className="mb-2">Master mobile app development for iOS or Android platforms.</p>
                          <p>🎯 Key Skills: Mobile Development, UI Design, App Publishing</p>
                          <p>⏱️ Estimated Duration: 5 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a Data Analyst" && (
                        <>
                          <p className="mb-2">Learn to analyze data and create meaningful insights.</p>
                          <p>🎯 Key Skills: SQL, Excel, Data Visualization, Statistics</p>
                          <p>⏱️ Estimated Duration: 5 weeks</p>
                        </>
                      )}
                      {formData.goal === "Become a Software Engineer" && (
                        <>
                          <p className="mb-2">Master programming fundamentals and software development.</p>
                          <p>🎯 Key Skills: Programming, Algorithms, System Design</p>
                          <p>⏱️ Estimated Duration: 6-8 weeks</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
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
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-gray-300 px-4 py-10 font-sans">
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

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl border border-gray-800 p-8 
                    shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                    hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]
                    transition-all duration-300">
          {renderStepIndicator()}
          
          <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-4 custom-scrollbar">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 
                         transition-colors flex items-center gap-2"
              >
                <FaArrowLeft className="text-sm" />
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className={`px-6 py-3 rounded-xl transition-colors ml-auto flex items-center gap-2
                          ${isStepComplete(formData, currentStep)
                            ? 'bg-blue-600 hover:bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                disabled={!isStepComplete(formData, currentStep)}
              >
                Next
                <FaArrowLeft className="text-sm rotate-180" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !isStepComplete(formData, 4)}
                className={`px-6 py-3 rounded-xl transition-colors ml-auto flex items-center gap-2
                          ${loading 
                            ? 'bg-gray-700 text-gray-400 cursor-wait'
                            : isStepComplete(formData, 4)
                              ? 'bg-green-600 hover:bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                {loading ? "Creating Your Journey..." : "Start Learning"}
                {!loading && <FaCheck className="text-sm" />}
              </button>
            )}
          </div>
        </form>

        {message && (
          <div className="mt-6 p-4 rounded-xl bg-green-900/20 border border-green-500/20 
                       text-green-400 text-center animate-fade-in">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-900/20 border border-red-500/20 
                       text-red-400 text-center animate-fade-in">
            <p>{error}</p>
            <button
              type="button"
              onClick={onBackHome}
              className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Return to homepage
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4B5563;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

UserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onBackHome: PropTypes.func.isRequired,
};

export default memo(UserForm);
