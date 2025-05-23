import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ onAuthSuccess, onBackHome }) => {
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
    <div className="relative w-screen h-screen flex bg-black">
      {/* Left Section - Video */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-black/80" />

        {/* Brand Section */}
        <div className="absolute bottom-20 left-20 z-10 max-w-xl">
          <h2 className="text-6xl font-bold text-gray-300 mb-6 leading-tight">
            Begin Your Learning Adventure
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Join our community of learners and discover AI-powered personalized education paths designed just for you.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-[40%] h-full bg-black flex flex-col">
        {/* Header */}
        <header 
          className="px-10 py-8 flex items-center justify-between border-b border-gray-900"
        onClick={() => onBackHome && onBackHome()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onBackHome && onBackHome();
          }
        }}
      >
          <h1 className="text-4xl font-bold text-gray-300 hover:text-gray-500 transition cursor-pointer">
          E-learning.ai
        </h1>
      </header>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center px-10 lg:px-20">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-300 mb-2">
                {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
              <p className="text-gray-400">
                {mode === "login" 
                  ? "Enter your credentials to access your account" 
                  : "Join us and start your learning journey"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1 block">
                    Email Address
                  </label>
          <input
            type="email"
            name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 text-gray-300 border border-gray-900
                             focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent
                             placeholder-gray-500 transition-all duration-300
                             shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                             hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]"
            onChange={handleChange}
            required
            value={formData.email}
          />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1 block">
                    Password
                  </label>
          <input
            type="password"
            name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 text-gray-300 border border-gray-900
                             focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent
                             placeholder-gray-500 transition-all duration-300
                             shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                             hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]"
            onChange={handleChange}
            required
            value={formData.password}
          />
                </div>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 py-3 rounded-xl
                         hover:from-gray-800 hover:to-gray-700 transform hover:scale-[1.02] 
                         active:scale-[0.98] transition-all duration-300 font-medium text-lg
                         shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
          </button>

              <div className="text-center">
                <p className="text-gray-400">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-gray-300 hover:text-gray-500 font-medium transition-colors duration-300"
            >
                    {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
              </div>
        </form>

            {message && (
              <div className="mt-4">
                <p className="text-sm px-4 py-2 rounded-xl bg-gray-900 text-gray-300 border border-gray-800 text-center
                          shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]">
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
