import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaBook,
  FaClock,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

const UserDetailsModal = ({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Goal:</strong> {userData.goal || "N/A"}</p>
          <p><strong>Age:</strong> {userData.age || "N/A"}</p>
          <p><strong>Education:</strong> {userData.education || "N/A"}</p>
          {/* Add any other signup info fields you have */}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
    // Close dropdown on outside click
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const toggleDropdown = () => setDropdownOpen((open) => !open);

  const openUserDetails = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700 text-xl font-semibold">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-24 w-24"></div>
        <span className="ml-6">Loading dashboard...</span>
      </div>
    );

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-600 text-xl font-semibold">
        Failed to load data.
      </div>
    );

  const steps = JSON.parse(userData.learning_path || "[]");
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = steps.length ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-66 bg-white border-r border-gray-200 flex flex-col justify-between shadow-lg">
        <div>
          <div className="px-8 py-6 border-b border-gray-200 flex items-center gap-3">
            <FaBook className="text-blue-600 text-3xl" />
            <h1 className="text-2xl font-extrabold text-gray-900">E-Learning.AI</h1>
          </div>

          <nav className="px-8 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Progress</p>
              <span className="text-sm font-semibold text-gray-700">{completedCount} / {steps.length}</span>
            </div>

            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-4 bg-blue-600 transition-all duration-700 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </nav>
        </div>

        <footer className="px-8 py-6 border-t border-gray-200 text-gray-500 text-xs text-center select-none">
          &copy; 2025 E-Learning.AI
        </footer>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 border-b border-gray-200 bg-white shadow-sm relative">
          <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 cursor-pointer select-none"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl text-gray-600" />
            <span className="font-medium text-gray-700">{userData.email}</span>
            <FaChevronDown
              className={`text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <button
                  onClick={openUserDetails}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  View Details
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Steps Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-gray-50">
          <h3 className="text-4xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <FaBook className="text-blue-600" /> Your Learning Path
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const isCompleted = progress[index];
              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-[1.03] border ${
                    isCompleted
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`text-xl font-semibold ${isCompleted ? "text-green-700" : "text-gray-900"}`}>
                      Step {index + 1}: {step.title}
                    </h4>
                    {isCompleted && <FaCheckCircle className="text-green-500 text-xl" />}
                  </div>
                  <p className="flex items-center gap-2 mb-5 text-gray-600 italic">
                    <FaClock /> {step.duration}
                  </p>
                  <a
                    href={step.resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-6 text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    Visit Resource
                  </a>
                  <button
                    disabled={isCompleted || updatingStep === index}
                    onClick={() => handleComplete(index)}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                      isCompleted
                        ? "bg-green-500 cursor-default"
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
