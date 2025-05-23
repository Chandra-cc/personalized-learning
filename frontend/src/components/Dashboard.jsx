import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaCheckCircle,
  FaBook,
  FaClock,
  FaUserCircle,
  FaChevronDown,
  FaChartLine,
  FaCalendarAlt,
  FaBookmark,
  FaMedal,
  FaRegLightbulb,
} from "react-icons/fa";

// Memoized Modal Component
const UserDetailsModal = memo(({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <FaUserCircle className="text-4xl text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Profile Details</h2>
            <p className="text-gray-400">{userData.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Learning Goal</p>
            <p className="font-medium">{userData.goal || "Not set"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Age</p>
              <p className="font-medium">{userData.age || "Not set"}</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Education</p>
              <p className="font-medium">{userData.education || "Not set"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                     px-4 py-3 rounded-xl text-white w-full font-medium transition-all duration-300 
                     transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
});

UserDetailsModal.displayName = 'UserDetailsModal';
UserDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string,
    goal: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    education: PropTypes.string,
  }).isRequired,
};

// Memoized Step Card Component
const LearningStepCard = memo(({ step, index, isCompleted, updatingStep, onComplete }) => {
  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-300 
                ${
                  isCompleted
                    ? "bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50"
                    : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-2xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FaClock />
              <span>{step.duration}</span>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isCompleted ? "text-green-300" : "text-white"
            }`}>
              {step.title}
            </h3>
          </div>
          {isCompleted && (
            <div className="p-2 bg-green-500/20 rounded-xl">
              <FaCheckCircle className="text-xl text-green-400" />
            </div>
          )}
        </div>

        <a
          href={step.resource}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 
                   transition-colors mb-6 group-hover:underline"
        >
          <FaBook className="text-sm" />
          <span>Access Learning Material</span>
        </a>

        <button
          disabled={isCompleted || updatingStep === index}
          onClick={() => onComplete(index)}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 
                    transform hover:scale-[1.02] active:scale-[0.98] ${
                      isCompleted
                        ? "bg-green-600/50 text-green-300 cursor-default"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                    }`}
        >
          {isCompleted 
            ? "Completed" 
            : updatingStep === index 
              ? "Updating..." 
              : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
});

LearningStepCard.displayName = 'LearningStepCard';
LearningStepCard.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  updatingStep: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
};

const Dashboard = ({ userId, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Memoized handlers
  const handleComplete = useCallback(async (index) => {
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
  }, [userId]);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const openUserDetails = useCallback(() => {
    setModalOpen(true);
    setDropdownOpen(false);
  }, []);

  // Fetch user data
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

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-xl font-medium text-gray-300">Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="p-6 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400">
          <p className="text-xl font-medium">Failed to load your dashboard</p>
          <p className="text-sm mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const steps = JSON.parse(userData.learning_path || "[]");
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = steps.length ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 flex flex-col">
        <div className="flex-1">
          <div className="px-8 py-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <FaBook className="text-2xl text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                E-Learning.AI
              </h1>
            </div>
          </div>

          <nav className="px-8 py-6 space-y-8">
            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-blue-400" />
                  <p className="font-medium text-gray-300">Learning Progress</p>
                </div>
                <span className="text-sm px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 font-medium">
                  {completedCount}/{steps.length}
                </span>
              </div>
              <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full 
                           transition-all duration-700 shadow-lg"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 
                            hover:bg-gray-800/70 transition-colors cursor-pointer">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FaMedal className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="font-medium">{completedCount} Lessons</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 
                            hover:bg-gray-800/70 transition-colors cursor-pointer">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FaRegLightbulb className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Goal</p>
                  <p className="font-medium">{userData.goal || "Set a goal"}</p>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <footer className="px-8 py-6 border-t border-gray-700/50">
          <div
            ref={dropdownRef}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-800/50 transition-colors"
            onClick={toggleDropdown}
          >
            <div className="p-2 bg-gray-800 rounded-xl">
              <FaUserCircle className="text-2xl text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium truncate">{userData.email}</p>
              <p className="text-sm text-gray-400">Student</p>
            </div>
            <FaChevronDown
              className={`text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            {dropdownOpen && (
              <div className="absolute bottom-20 left-8 right-8 bg-gray-800 border border-gray-700 
                            rounded-xl shadow-xl overflow-hidden">
                <button
                  onClick={openUserDetails}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-700/50 transition-colors"
                >
                  <FaUserCircle className="text-gray-400" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => onLogout()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-700/50 transition-colors"
                >
                  <FaBookmark className="transform rotate-90" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="px-10 py-6 bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Learning Journey
              </h2>
              <p className="text-gray-400 mt-1">Track your progress and achieve your goals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <FaCalendarAlt className="text-gray-400" />
                <span className="text-gray-300">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Learning Steps */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <LearningStepCard
                key={index}
                step={step}
                index={index}
                isCompleted={progress[index]}
                updatingStep={updatingStep}
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>
      </main>

      <UserDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userData={userData}
      />
    </div>
  );
};

Dashboard.propTypes = {
  userId: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default memo(Dashboard);
