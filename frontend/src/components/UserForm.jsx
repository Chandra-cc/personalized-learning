import React, { useState } from "react";
import { submitUserData } from "../api/api";

const UserForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    goal: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitUserData(formData);
    setMessage(response?.message || "Submission failed");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Personalized Learning Path</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="text"
          name="education"
          placeholder="Education (e.g., B.Tech, MBA)"
          value={formData.education}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="goal"
          placeholder="Your Career Goal"
          value={formData.goal}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default UserForm;
