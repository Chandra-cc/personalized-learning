import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/animations.css";

const Dashboard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${userId}`);
        setUserData(res.data);
        setProgress(JSON.parse(res.data.progress || "{}"));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleComplete = async (index) => {
    setUpdatingStep(index);
    try {
      await axios.post(`http://localhost:5000/update-progress/${userId}`, {
        step_index: index,
      });
      setProgress((prev) => ({ ...prev, [index]: true }));
    } catch (err) {
      console.error("Failed to update progress:", err);
    } finally {
      setUpdatingStep(null);
    }
  };

  if (loading)
    return <div className="text-center text-white mt-10">Loading dashboard...</div>;
  if (!userData)
    return <div className="text-center mt-10 text-red-500">Failed to load data.</div>;

  const steps = JSON.parse(userData.learning_path || "[]");
  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <p className="text-sm text-gray-400">Email: {userData.email}</p>
        <p className="text-sm text-gray-400">Goal: {userData.goal}</p>
        <p className="text-sm text-gray-400">Progress: {completedCount}/{steps.length}</p>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto slide-up">
        <h2 className="text-3xl font-bold mb-6">📘 Your Learning Path</h2>

        <div className="w-full bg-gray-700 h-3 rounded mb-6">
          <div
            className="bg-blue-500 h-3 rounded transition-all duration-500"
            style={{
              width: `${(completedCount / steps.length) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const isCompleted = progress[index];
            return (
              <div
                key={index}
                className={`p-5 rounded-xl transition-all ${
                  isCompleted ? "bg-green-900" : "bg-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  ⏱️ {step.duration}
                </p>
                <a
                  href={step.resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline mt-2 block"
                >
                  Visit Resource
                </a>
                <button
                  disabled={isCompleted || updatingStep === index}
                  onClick={() => handleComplete(index)}
                  className={`mt-4 px-4 py-2 text-sm rounded ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isCompleted ? "✅ Completed" : "Mark as Complete"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
