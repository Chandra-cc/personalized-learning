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
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-gray-300 rounded-2xl p-8 max-w-md w-full 
                  shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                  hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]
                  border border-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gray-800 rounded-xl">
            <FaUserCircle className="text-4xl text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-300">Profile Details</h2>
            <p className="text-gray-400">{userData.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-xl border border-gray-900">
            <p className="text-sm text-gray-400 mb-1">Learning Goal</p>
            <p className="font-medium text-gray-300">{userData.goal || "Not set"}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-xl border border-gray-900">
              <p className="text-sm text-gray-400 mb-1">Age</p>
              <p className="font-medium text-gray-300">{userData.age || "Not set"}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-xl border border-gray-900">
              <p className="text-sm text-gray-400 mb-1">Education</p>
              <p className="font-medium text-gray-300">{userData.education || "Not set"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 
                     px-4 py-3 rounded-xl text-gray-200 w-full font-medium transition-all duration-300 
                     transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]"
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
                    ? "bg-gray-800 border-gray-900"
                    : "bg-gray-900 border-gray-900 hover:bg-gray-800"
                }
                shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]
                hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]`}
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FaClock />
              <span>{step.duration}</span>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isCompleted ? "text-gray-300" : "text-gray-300"
            }`}>
              {step.title}
            </h3>
          </div>
          {isCompleted && (
            <div className="p-2 bg-gray-800 rounded-xl">
              <FaCheckCircle className="text-xl text-gray-300" />
            </div>
          )}
        </div>

        <a
          href={step.resource}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-gray-500 
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
                        ? "bg-gray-800 text-gray-400 cursor-default"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-gray-200 shadow-[0_0_10px_2px_rgba(255,255,255,0.05)]"
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
    <div className="flex h-screen w-full bg-black text-gray-300 font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 border-r border-gray-900 flex flex-col">
        <div className="flex-1">
          <div className="px-8 py-6 border-b border-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-800 rounded-xl">
                <FaBook className="text-2xl text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-300">
                E-Learning.AI
              </h1>
            </div>
          </div>

          <nav className="px-8 py-6 space-y-8">
            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-gray-400" />
                  <p className="font-medium text-gray-300">Learning Progress</p>
                </div>
                <span className="text-sm px-3 py-1 bg-gray-800 rounded-full text-gray-300 font-medium">
                  {completedCount}/{steps.length}
                </span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-full 
                           transition-all duration-700 shadow-lg"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-900 
                            hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <FaMedal className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="font-medium text-gray-300">{completedCount} Lessons</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-900 
                            hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <FaRegLightbulb className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Goal</p>
                  <p className="font-medium text-gray-300">{userData.goal || "Set a goal"}</p>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <footer className="px-8 py-6 border-t border-gray-900">
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-800 transition-colors"
            onClick={toggleDropdown}
          >
            <div className="p-2 bg-gray-800 rounded-xl">
              <FaUserCircle className="text-2xl text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium truncate text-gray-300">{userData.email}</p>
              <p className="text-sm text-gray-400">Student</p>
            </div>
            <FaChevronDown
              className={`text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            {dropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-900 
                            rounded-xl shadow-[0_0_10px_2px_rgba(255,255,255,0.05)] overflow-hidden">
                <button
                  onClick={openUserDetails}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-700 transition-colors text-gray-300"
                >
                  <FaUserCircle className="text-gray-400" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => onLogout()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
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
        <header className="px-10 py-6 bg-gray-900 border-b border-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-300">
                Your Learning Journey
              </h2>
              <p className="text-gray-400 mt-1">Track your progress and achieve your goals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl border border-gray-900">
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
