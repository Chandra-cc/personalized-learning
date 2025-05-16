import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [userId, setUserId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch user profile and decide if form submitted
  const checkFormSubmitted = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${id}`);
      const learningPath = res.data.learning_path;

      // learningPath is a JSON string stored in DB, parse it safely
      const path = learningPath ? JSON.parse(learningPath) : [];

      if (Array.isArray(path) && path.length > 0) {
        setFormSubmitted(true);
        localStorage.setItem("form_submitted", "true");
      } else {
        setFormSubmitted(false);
        localStorage.removeItem("form_submitted");
      }
    } catch (error) {
      setFormSubmitted(false);
      localStorage.removeItem("form_submitted");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      checkFormSubmitted(storedUserId);
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {userId ? (
        <>
          <button
            onClick={handleLogout}
            className="mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
          {!formSubmitted ? (
            <UserForm userId={userId} onSubmitSuccess={handleFormSubmitSuccess} />
          ) : (
            <Dashboard userId={userId} />
          )}
        </>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
