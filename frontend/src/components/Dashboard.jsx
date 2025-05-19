import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaBook,
  FaClock,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

const UserDetailsModal = ({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1f2937] text-white rounded-xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="space-y-3">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Goal:</strong> {userData.goal || "N/A"}</p>
          <p><strong>Age:</strong> {userData.age || "N/A"}</p>
          <p><strong>Education:</strong> {userData.education || "N/A"}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ userId, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const openUserDetails = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl font-semibold">
        <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        <span className="ml-6">Loading dashboard...</span>
      </div>
    );

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500 text-xl font-semibold">
        Failed to load data.
      </div>
    );

  const steps = JSON.parse(userData.learning_path || "[]");
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = steps.length ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col justify-between">
        <div>
          <div className="px-8 py-6 border-b border-gray-700 flex items-center gap-3">
            <FaBook className="text-blue-500 text-3xl" />
            <h1 className="text-2xl font-bold text-white">E-Learning.AI</h1>
          </div>
          <nav className="px-8 py-6 space-y-6">
            <div className="flex justify-between items-center">
              <p className="uppercase text-sm text-gray-400 font-semibold">Progress</p>
              <span className="text-sm text-white font-medium">{completedCount}/{steps.length}</span>
            </div>
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-3 bg-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </nav>
        </div>
        <footer className="px-8 py-6 text-xs text-center text-gray-500 border-t border-gray-700 select-none">
          &copy; 2025 E-Learning.AI
        </footer>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 border-b border-gray-700 bg-gray-800 relative">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl text-white" />
            <span className="font-medium">{userData.email}</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                <button
                  onClick={openUserDetails}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700"
                >
                  View Details
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Steps */}
        <main className="flex-1 overflow-y-auto p-10 bg-gray-900">
          <h3 className="text-4xl font-bold mb-10 flex items-center gap-3">
            <FaBook className="text-blue-500" /> Your Learning Path
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const isCompleted = progress[index];
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border ${
                    isCompleted
                      ? "bg-green-800 border-green-600"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`text-xl font-semibold ${isCompleted ? "text-green-200" : "text-white"}`}>
                      Step {index + 1}: {step.title}
                    </h4>
                    {isCompleted && <FaCheckCircle className="text-green-400 text-xl" />}
                  </div>
                  <p className="flex items-center gap-2 mb-4 text-gray-300 italic">
                    <FaClock /> {step.duration}
                  </p>
                  <a
                    href={step.resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-6 text-blue-400 hover:text-blue-300 underline"
                  >
                    Visit Resource
                  </a>
                  <button
                    disabled={isCompleted || updatingStep === index}
                    onClick={() => handleComplete(index)}
                    className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                      isCompleted
                        ? "bg-green-600 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isCompleted ? "Completed" : updatingStep === index ? "Updating..." : "Mark as Complete"}
                  </button>
                </div>
              );
            })}
          </div>
        </main>

        {/* User Details Modal */}
        <UserDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
