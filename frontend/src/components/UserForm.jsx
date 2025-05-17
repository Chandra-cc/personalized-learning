import React, { useState, useRef, useEffect } from "react";
import { submitUserData } from "../api/api";
import "../styles/animations.css";

const suggestions = {
  education: ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Self-Taught", "Bootcamp"],
  goal: ["Data Scientist", "Software Engineer", "AI Researcher", "Product Manager", "UX Designer", "Entrepreneur"],
};

const UserForm = ({ userId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    goal: "",
  });
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState({ education: false, goal: false });

  // Refs for the suggestion dropdowns
  const educationRef = useRef(null);
  const goalRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        educationRef.current && !educationRef.current.contains(event.target)
      ) {
        setShowSuggestions((s) => ({ ...s, education: false }));
      }
      if (goalRef.current && !goalRef.current.contains(event.target)) {
        setShowSuggestions((s) => ({ ...s, goal: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name in showSuggestions) {
      setShowSuggestions({ ...showSuggestions, [e.target.name]: true });
    }
  };

  const handleSuggestionClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setShowSuggestions({ ...showSuggestions, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, user_id: userId };
    const response = await submitUserData(payload);

    if (response?.message === "User data submitted successfully") {
      setMessage(`Awesome! You're among the top learners targeting ${formData.goal}. 🚀`);
      if (onSubmitSuccess) onSubmitSuccess();
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 px-4 text-white">
      <div className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl slide-up">
        <h2 className="text-4xl font-extrabold text-center mb-8">Let's Get to Know You</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            name="age"
            placeholder="How old are you?"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>

          <div className="relative" ref={educationRef}>
            <input
              type="text"
              name="education"
              placeholder="What's your educational background?"
              value={formData.education}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showSuggestions.education && (
              <ul className="absolute z-10 bg-gray-800 w-full mt-1 rounded-lg shadow-lg">
                {suggestions.education
                  .filter((e) =>
                    e.toLowerCase().includes(formData.education.toLowerCase())
                  )
                  .map((option, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-indigo-600 cursor-pointer"
                      onClick={() => handleSuggestionClick("education", option)}
                    >
                      {option}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="relative" ref={goalRef}>
            <input
              type="text"
              name="goal"
              placeholder="What's your career goal?"
              value={formData.goal}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showSuggestions.goal && (
              <ul className="absolute z-10 bg-gray-800 w-full mt-1 rounded-lg shadow-lg">
                {suggestions.goal
                  .filter((g) =>
                    g.toLowerCase().includes(formData.goal.toLowerCase())
                  )
                  .map((option, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-indigo-600 cursor-pointer"
                      onClick={() => handleSuggestionClick("goal", option)}
                    >
                      {option}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-lg"
          >
            Submit and Start My Journey
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-green-400 font-medium text-lg animate-fade-in">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
