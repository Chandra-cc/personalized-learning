import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login"); // or 'signup'
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
        // Notify parent about successful auth
        onAuthSuccess && onAuthSuccess(res.data.user_id);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">{mode === "login" ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
          onChange={handleChange}
          required
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          onChange={handleChange}
          required
          value={formData.password}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-700">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-blue-500 underline">
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>

      {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default AuthForm;
