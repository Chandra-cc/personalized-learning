import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import CompanyPage from "./components/CompanyPage";
import config from './config';

// API Configuration
// const API_BASE_URL = "http://34.227.104.91:5000";  // EC2 URL
// const API_BASE_URL = "http://localhost:5000";  // Local development URL

function App() {
  const [userId, setUserId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true); // Landing page toggle

  const checkFormSubmitted = async (id) => {
    try {
      const res = await axios.get(`${config.API_BASE_URL}/user/${id}`);
      const learningPath = res.data.learning_path;

      // Check if learning path exists and has items
      if (Array.isArray(learningPath) && learningPath.length > 0) {
        setFormSubmitted(true);
        localStorage.setItem("form_submitted", "true");
      } else {
        setFormSubmitted(false);
        localStorage.removeItem("form_submitted");
      }
    } catch (error) {
      console.error("Error checking form submission:", error);
      // Only clear form submitted if there's an actual error
      if (error.response && error.response.status !== 200) {
      setFormSubmitted(false);
      localStorage.removeItem("form_submitted");
      } else {
        // If it's a network error, keep the existing state
        const wasSubmitted = localStorage.getItem("form_submitted") === "true";
        setFormSubmitted(wasSubmitted);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const wasFormSubmitted = localStorage.getItem("form_submitted") === "true";
    
    if (storedUserId) {
      setUserId(storedUserId);
      setShowLanding(false);
      if (wasFormSubmitted) {
        // If we know the form was submitted, set it immediately
        setFormSubmitted(true);
        setLoading(false);
      } else {
        // Only check with the server if we're not sure
      checkFormSubmitted(storedUserId);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthSuccess = (id) => {
    setUserId(id);
    localStorage.setItem("user_id", id);
    setLoading(true);
    checkFormSubmitted(id);
  };

  const handleFormSubmitSuccess = () => {
    setFormSubmitted(true);
    localStorage.setItem("form_submitted", "true");
  };

  const handleLogout = () => {
    setUserId(null);
    setFormSubmitted(false);
    localStorage.removeItem("user_id");
    localStorage.removeItem("form_submitted");
    setShowLanding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
        Loading...
      </div>
    );
  }

  if (showLanding) {
    return <CompanyPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#1e1e1e] text-white">
      {userId ? (
        !formSubmitted ? (
          <UserForm
            userId={userId}
            onSubmitSuccess={handleFormSubmitSuccess}
            onBackHome={() => {
              setUserId(null);
              localStorage.removeItem("user_id");
              setShowLanding(true);
            }}
          />
        ) : (
          <Dashboard userId={userId} onLogout={handleLogout} />
        )
      ) : (
        <AuthForm
          onAuthSuccess={handleAuthSuccess}
          onBackHome={() => setShowLanding(true)}
        />
      )}
    </div>
  );
}

export default App;
