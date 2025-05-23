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
    <div className="relative w-screen h-screen flex">
      {/* Left Section - Video */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-digital-wave-background-97895-large.mp4"
            type="video/mp4"
          />
          {/* Fallback for video */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        
        {/* Animated Particles Effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 10%)',
          backgroundSize: '3vmin 3vmin'
        }} />

        {/* Brand Section */}
        <div className="absolute bottom-20 left-20 z-10 max-w-xl">
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Learning Journey
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Discover personalized learning paths powered by artificial intelligence.
            Your journey to knowledge starts here.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-[40%] h-full bg-gradient-to-br from-gray-900 to-black flex flex-col">
        {/* Header */}
        <header 
          className="px-10 py-8 flex items-center justify-between"
          onClick={() => onBackHome && onBackHome()}
          title="Go to Home"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onBackHome && onBackHome();
            }
          }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 
                         transition-all duration-300 cursor-pointer">
            E-learning.ai
          </h1>
        </header>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center px-10 lg:px-20">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
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
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             placeholder-gray-500 transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             placeholder-gray-500 transition-all duration-300"
                    onChange={handleChange}
                    required
                    value={formData.password}
                  />
                </div>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg
                         hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] 
                         active:scale-[0.98] transition-all duration-300 font-medium text-lg
                         shadow-lg shadow-blue-500/25"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>

              <div className="text-center">
                <p className="text-gray-400">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                  >
                    {mode === "login" ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </form>

            {message && (
              <div className="mt-4">
                <p className="text-sm px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-center">
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
