import React, { useState } from "react";
import axios from "axios";
import "../styles/animations.css";

const AuthForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/login" : "/signup";

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      setMessage(res.data.message);

      if (res.data.user_id) {
        onAuthSuccess && onAuthSuccess(res.data.user_id);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 fade-in">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            value={formData.password}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-all duration-300"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-400 hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>

        {message && (
          <p className="text-center text-green-400 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
