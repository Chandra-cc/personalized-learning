import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { submitUserData } from "../api/api";
import { FaGraduationCap, FaUserAlt, FaChartLine, FaArrowLeft } from "react-icons/fa";
import "../styles/animations.css";

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
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    goal: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name in showSuggestions) {
      setShowSuggestions(prev => ({ ...prev, [e.target.name]: true }));
    }
    setError("");
  }, [showSuggestions]);

  const handleSuggestionClick = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowSuggestions(prev => ({ ...prev, [field]: false }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await submitUserData({ ...formData, user_id: userId });

      if (response?.message === "User data submitted successfully") {
        setMessage(`Welcome aboard! Your personalized learning journey as a ${formData.goal} begins now 🚀`);
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black 
                    text-gray-300 px-4 py-10 font-sans">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center relative">
          <button
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

        <div className="bg-gray-900 rounded-2xl border border-gray-900 p-8 
                      shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                      hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                icon={FaUserAlt}
                label="Age"
                type="number"
                name="age"
                placeholder="Your age"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <label className="text-sm text-gray-300 mb-1 block">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-gray-900 rounded-xl text-gray-300 border border-gray-900
                           focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent
                           transition-all duration-300 appearance-none"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative" ref={educationRef}>
                <FormInput
                  icon={FaGraduationCap}
                  label="Education"
                  type="text"
                  name="education"
                  placeholder="Your educational background"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <SuggestionsList
                  show={showSuggestions.education}
                  options={suggestions.education}
                  filter={formData.education}
                  onSelect={(value) => handleSuggestionClick("education", value)}
                />
              </div>

              <div className="relative" ref={goalRef}>
                <FormInput
                  icon={FaChartLine}
                  label="Career Goal"
                  type="text"
                  name="goal"
                  placeholder="Your career aspiration"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <SuggestionsList
                  show={showSuggestions.goal}
                  options={suggestions.goal}
                  filter={formData.goal}
                  onSelect={(value) => handleSuggestionClick("goal", value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 
                       transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100
                       bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 
                       disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed
                       text-gray-200 shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]"
            >
              {loading ? "Creating Your Journey..." : "Begin My Learning Adventure"}
            </button>
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
                onClick={onBackHome}
                className="mt-3 text-sm text-gray-300 hover:text-gray-500 transition-colors duration-200"
              >
                Return to homepage
              </button>
            </div>
          )}
        </div>
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
