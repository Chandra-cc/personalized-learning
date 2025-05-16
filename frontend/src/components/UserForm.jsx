import React, { useState } from "react";
import { submitUserData } from "../api/api";
import "../styles/animations.css";

const UserForm = ({ userId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    goal: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      user_id: userId,
    };

    const response = await submitUserData(payload);

    if (response?.message === "User data submitted successfully") {
      setMessage(response.message);
      if (onSubmitSuccess) onSubmitSuccess();
    } else {
      setMessage("Submission failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white px-4 slide-up">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-center mb-4">Tell Us About Yourself</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            name="goal"
            placeholder="Your Career Goal"
            value={formData.goal}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="text-center text-green-400 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
