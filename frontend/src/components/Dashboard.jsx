import React, { useEffect, useState} from "react";
import axios from "axios";
import { FaCheckCircle, FaBook, FaClock, FaMoon, FaSun } from "react-icons/fa";
import "../styles/animations.css";

const Dashboard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white text-xl font-semibold">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        <span className="ml-6">Loading dashboard...</span>
      </div>
    );

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-red-500 text-xl font-semibold">
        Failed to load data.
      </div>
    );

  const steps = JSON.parse(userData.learning_path || "[]");
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = steps.length ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="flex h-screen transition-colors duration-700 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 light:bg-gray-100 light:text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white bg-opacity-10 backdrop-blur-md rounded-r-3xl shadow-lg p-8 flex flex-col justify-between border-l border-blue-600/30 light:bg-white light:bg-opacity-40 light:border-blue-400">
        <div>
          <h2 className="text-4xl font-extrabold mb-8 tracking-wide text-blue-400 drop-shadow-lg light:text-blue-600">
            E-Learning.AI
          </h2>
          <div className="mb-8 space-y-2">
            <p className="text-blue-300 font-semibold uppercase tracking-widest light:text-blue-600">
              Email
            </p>
            <p className="truncate text-white font-medium light:text-gray-800">{userData.email}</p>
          </div>
          <div className="mb-8 space-y-2">
            <p className="text-blue-300 font-semibold uppercase tracking-widest light:text-blue-600">
              Learning Goal
            </p>
            <p className="capitalize text-white font-medium light:text-gray-800">{userData.goal}</p>
          </div>
          <div>
            <p className="text-blue-300 font-semibold uppercase tracking-widest mb-3 light:text-blue-600">
              Progress
            </p>
            <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-5 light:bg-blue-300 light:bg-opacity-30">
              <div
                className="bg-blue-500 h-5 rounded-full transition-all duration-700 shadow-[0_0_10px_#3b82f6] light:bg-blue-600"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-right text-sm text-blue-300 mt-1 font-semibold light:text-blue-700">
              {completedCount} / {steps.length} Steps Completed
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold shadow-lg light:bg-blue-500 light:hover:bg-blue-600"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <footer className="text-center text-blue-500 text-xs mt-auto font-mono select-none light:text-blue-700">
          &copy; 2025 E-Learning.AI
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800 light:scrollbar-thumb-blue-500 light:scrollbar-track-gray-300">
        <h2 className="text-5xl font-extrabold mb-10 tracking-tight text-blue-400 drop-shadow-lg flex items-center gap-3 light:text-blue-600">
          <FaBook /> Your Learning Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => {
            const isCompleted = progress[index];
            return (
              <div
                key={index}
                className={`p-8 rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-[1.05] ${
                  isCompleted
                    ? "bg-green-900 bg-opacity-90 shadow-green-700/60 border border-green-500 light:bg-green-400 light:bg-opacity-30 light:shadow-green-400/40 light:border-green-500"
                    : "bg-white bg-opacity-10 backdrop-blur-md border border-blue-700/40 light:bg-white light:bg-opacity-40 light:border-blue-400"
                }`}
              >
                <h3 className="text-3xl font-semibold mb-3 flex items-center gap-3 text-white light:text-gray-900">
                  Step {index + 1}: {step.title}{" "}
                  {isCompleted && <FaCheckCircle className="text-green-400" />}
                </h3>
                <p className="text-blue-300 italic mb-5 flex items-center gap-2 text-lg light:text-blue-700">
                  <FaClock /> {step.duration}
                </p>
                <a
                  href={step.resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-6 text-blue-400 hover:text-blue-600 font-semibold underline light:text-blue-600 light:hover:text-blue-800"
                >
                  Visit Resource
                </a>
                <button
                  disabled={isCompleted || updatingStep === index}
                  onClick={() => handleComplete(index)}
                  className={`w-full py-4 rounded-xl font-bold tracking-wide text-lg transition-colors duration-300 shadow-lg ${
                    isCompleted
                      ? "bg-green-600 text-white cursor-default shadow-green-500/80"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/80 light:bg-blue-500 light:hover:bg-blue-600"
                  }`}
                >
                  {isCompleted
                    ? "✅ Completed"
                    : updatingStep === index
                    ? "Updating..."
                    : "Mark as Complete"}
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
