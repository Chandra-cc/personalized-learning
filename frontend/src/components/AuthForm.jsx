import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/img1.jpg"; // Ensure this image exists

const AuthForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <div className="relative w-screen h-screen">
      {/* Background Image */}
      <img
        src={loginImage}
        alt="Login Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay for slight dim effect (optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />

      {/* Login Form */}
      <div className="relative z-10 flex items-center h-full px-10 md:px-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-transparent text-white space-y-6 animate-fade-in"
        >
          <h2 className="text-3xl font-bold">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black bg-opacity-60 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-black bg-opacity-60 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
            value={formData.password}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          <p className="text-sm">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-300 underline"
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </p>

          {message && <p className="text-green-300 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
