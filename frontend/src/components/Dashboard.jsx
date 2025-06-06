import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import config from '../config';
import {
  FaCheckCircle,
  FaBook,
  FaClock,
  FaUserCircle,
  FaChevronDown,
  FaChartLine,
  FaCalendarAlt,
  FaBookmark,
  FaChevronUp,
  FaFire,
  FaBrain,
  FaChevronRight,
  FaSync,
  FaRocket,
  FaStar,
  FaCode,
} from "react-icons/fa";

// Memoized Modal Component
const UserDetailsModal = memo(({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  // Helper to render array or comma-separated string
  const renderArray = (arr) => {
    if (!arr) return "Not set";
    if (typeof arr === "string") {
      try {
        const parsed = JSON.parse(arr);
        if (Array.isArray(parsed)) return parsed.join(", ");
        return arr;
      } catch {
        return arr;
      }
    }
    if (Array.isArray(arr)) return arr.join(", ");
    return arr;
  };

  // Helper to render object
  const renderObject = (obj) => {
    if (!obj || typeof obj !== "object") return "Not set";
    return (
      <ul className="list-disc list-inside text-gray-300 text-sm">
        {Object.entries(obj).map(([k, v]) => (
          <li key={k}><span className="font-medium text-gray-200">{k}:</span> {v}</li>
        ))}
      </ul>
    );
  };

  const prefs = userData.preferences || {};

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-gray-100 rounded-2xl p-8 max-w-4xl w-full border border-gray-700 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflow: 'visible' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gray-800 rounded-xl">
            <FaUserCircle className="text-4xl text-gray-200" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-100">User Profile</h2>
            <p className="text-gray-300 text-lg">{userData.email}</p>
          </div>
        </div>
        <div className="space-y-10 overflow-y-auto" style={{ maxHeight: '65vh', paddingRight: '0.5rem' }}>
          {/* Personal Info */}
          <section>
            <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2"><FaUserCircle /> Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard label="Age" value={userData.age} />
              <ProfileCard label="Gender" value={userData.gender} />
              <ProfileCard label="Education" value={userData.education} />
              <ProfileCard label="Education Level" value={userData.education_level} />
            </div>
          </section>
          {/* Professional Info */}
          <section>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2"><FaChartLine /> Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard label="Current Role" value={userData.current_role} />
              <ProfileCard label="Years of Experience" value={userData.years_of_experience || prefs.years_of_experience} />
              <ProfileCard label="Industry" value={userData.industry} />
              <ProfileCard label="Certifications" value={renderArray(userData.certifications)} />
              <ProfileCard label="Career Goals" value={renderArray(userData.career_goals || prefs.career_goals)} />
              <ProfileCard label="Skills Self-Assessment" value={userData.skills_self_assessment && Object.keys(userData.skills_self_assessment).length > 0 ? renderObject(userData.skills_self_assessment) : "Not set"} />
            </div>
          </section>
          {/* Learning Preferences */}
          <section>
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2"><FaBook /> Learning Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard label="Learning Goal" value={userData.goal} />
              <ProfileCard label="Difficulty Preference" value={prefs.difficulty_preference} />
              <ProfileCard label="Learning Style" value={prefs.learning_style} />
              <ProfileCard label="Preferred Content Types" value={renderArray(prefs.preferred_content_types)} />
              <ProfileCard label="Session Duration (min)" value={prefs.preferred_session_duration} />
              <ProfileCard label="Learning Environment" value={prefs.learning_environment} />
              <ProfileCard label="Available Hours/Week" value={prefs.available_hours_per_week} />
              <ProfileCard label="Preferred Learning Time" value={prefs.preferred_learning_time} />
              <ProfileCard label="Daily Goal (min)" value={prefs.daily_goal_minutes} />
              <ProfileCard label="Preferred Deadline" value={userData.preferred_deadline} />
              <ProfileCard label="Preferred Teaching Styles" value={renderArray(userData.preferred_teaching_styles)} />
            </div>
          </section>
          {/* Technical Context */}
          <section>
            <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2"><FaBrain /> Technical Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard label="Preferred Tools" value={renderArray(userData.preferred_tools)} />
              <ProfileCard label="Device Constraints" value={userData.device_constraints && Object.keys(userData.device_constraints).length > 0 ? renderObject(userData.device_constraints) : "Not set"} />
              <ProfileCard label="Accessibility Needs" value={renderArray(userData.accessibility_needs)} />
              <ProfileCard label="Collaboration Preference" value={userData.collaboration_preference} />
              <ProfileCard label="Mentorship Interest" value={userData.mentorship_interest ? "Yes" : "No"} />
            </div>
          </section>
          {/* Motivation & Interests */}
          <section>
            <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center gap-2"><FaFire /> Motivation & Interests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard label="Motivation Factors" value={renderArray(userData.motivation_factors)} />
              <ProfileCard label="Interests" value={renderArray(userData.interests)} />
            </div>
          </section>
        </div>
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

// ProfileCard helper component
const ProfileCard = ({ label, value }) => (
  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 h-full min-h-[70px] flex flex-col justify-between">
    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{label}</p>
    <div className="text-base text-gray-100 break-words">{value || "Not set"}</div>
  </div>
);

// Memoized Step Card Component
const LearningStepCard = memo(({ step, index, isCompleted, updatingStep, onComplete, analytics }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [rating, setRating] = useState(0);
  const [comprehension, setComprehension] = useState(0);
  const [notes, setNotes] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (analytics) {
      setRating(analytics.difficulty_rating || 0);
      setComprehension(analytics.comprehension_score || 0);
      setTimeSpent(analytics.time_spent || 0);
    }
  }, [analytics]);

  const handleComplete = async () => {
    await onComplete(index, {
      difficulty_rating: rating,
      comprehension_score: comprehension,
      notes,
      time_spent: timeSpent
    });
  };

  // Ensure step has all required properties with defaults
  const {
    title = "",
    duration = "",
    description = "",
    learning_objectives = [],
    resources = {},
    projects = [],
    prerequisites = [],
    skills_gained = []
  } = step || {};

  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-300 
                ${
                  isCompleted
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-900 border-gray-700 hover:bg-gray-800"
                }
                shadow-[0_0_15px_3px_rgba(255,255,255,0.1)]
                hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)]`}
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <FaClock />
              <span>{duration}</span>
              {prerequisites.length > 0 && (
                <span className="ml-2 text-gray-400">
                  Prerequisites: {prerequisites.join(", ")}
                </span>
              )}
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isCompleted ? "text-gray-100" : "text-gray-100"
            }`}>
              {title}
            </h3>
            <p className="text-gray-400 mb-4">{description}</p>
          </div>
          {isCompleted && (
            <div className="p-2 bg-gray-800 rounded-xl">
              <FaCheckCircle className="text-xl text-gray-100" />
            </div>
          )}
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-300 hover:text-gray-100 mb-4 flex items-center gap-2"
        >
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <div className="space-y-6 mb-6">
            {/* Learning Objectives */}
            {learning_objectives.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Learning Objectives</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {learning_objectives.map((objective, i) => (
                    <li key={i}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            {Object.keys(resources).length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Learning Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(resources).map(([type, url]) => (
                    <a
                      key={type}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors"
                    >
                      <FaBook />
                      <span className="capitalize">{type.replace('_', ' ')}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Projects</h4>
                {projects.map((project, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-xl">
                    <h5 className="font-medium text-gray-200">{project.title}</h5>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                    <span className="text-xs text-gray-500 mt-2 inline-block">
                      Difficulty: {project.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills_gained.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-2">Skills You'll Gain</h4>
                <div className="flex flex-wrap gap-2">
                  {skills_gained.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Tracking (if not completed) */}
            {!isCompleted && (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 block mb-2">Difficulty Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">
                    Comprehension Level: {comprehension}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={comprehension}
                    onChange={(e) => setComprehension(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Time Spent (minutes)</label>
                  <input
                    type="number"
                    min="0"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(parseInt(e.target.value))}
                    className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg w-full h-24 resize-none"
                    placeholder="Add your notes about this step..."
                  />
                </div>
              </div>
            )}

            {/* Analytics (if completed) */}
            {isCompleted && analytics && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <h5 className="text-gray-300 mb-1">Time Spent</h5>
                    <p className="text-2xl font-semibold text-gray-100">
                      {analytics.time_spent} min
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <h5 className="text-gray-300 mb-1">Difficulty</h5>
                    <p className="text-2xl font-semibold text-gray-100">
                      {analytics.difficulty_rating}/5
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h5 className="text-gray-300 mb-1">Comprehension Score</h5>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                      <div
                        style={{ width: `${analytics.comprehension_score}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-300"
                      />
                    </div>
                    <span className="text-gray-400 text-sm mt-1">
                      {analytics.comprehension_score}%
                    </span>
                  </div>
                </div>
                {analytics.notes && (
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <h5 className="text-gray-300 mb-1">Notes</h5>
                    <p className="text-gray-400">{analytics.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          disabled={isCompleted || updatingStep === index}
          onClick={handleComplete}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 
                    transform hover:scale-[1.02] active:scale-[0.98] ${
                      isCompleted
                        ? "bg-gray-800 text-gray-400 cursor-default"
                        : "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-100 shadow-[0_0_15px_3px_rgba(255,255,255,0.1)]"
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
  analytics: PropTypes.shape({
    difficulty_rating: PropTypes.number,
    comprehension_score: PropTypes.number,
    time_spent: PropTypes.number,
    notes: PropTypes.string,
  }),
};

const Dashboard = ({ userId, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStep, setUpdatingStep] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nextStepsExpanded, setNextStepsExpanded] = useState(true);
  const [reviewsExpanded, setReviewsExpanded] = useState(true);
  const dropdownRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState(null);
  const [analytics, setAnalytics] = useState({
    overall_stats: {
      current_streak: 0,
      total_time_spent: 0,
      average_comprehension: 0,
      total_steps_completed: 0
    },
    daily_analytics: []
  });

  // Fetch user data, analytics, and recommendations
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user data and analytics...');
        const [userRes, analyticsRes, recommendationsRes, insightsRes] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/user/${userId}`),
          axios.get(`${config.API_BASE_URL}/analytics/${userId}`).catch(err => {
            console.warn('Failed to fetch analytics:', err);
            return { data: null };
          }),
          axios.get(`${config.API_BASE_URL}/dashboard-recommendations/${userId}`).catch(err => {
            console.warn('Failed to fetch recommendations:', err);
            return { data: { recommendations: [] } };
          }),
          axios.get(`${config.API_BASE_URL}/insights/${userId}`).catch(err => {
            console.warn('Failed to fetch insights:', err);
            return { data: null };
          })
        ]);
        
        console.log('User API Response:', userRes.data);
        console.log('Analytics API Response:', analyticsRes.data);
        console.log('Recommendations API Response:', recommendationsRes.data);
        console.log('Insights API Response:', insightsRes.data);
        
        setUserData(userRes.data);
        if (recommendationsRes.data && recommendationsRes.data.recommendations) {
          console.log('Setting recommendations:', recommendationsRes.data.recommendations);
          setRecommendations(recommendationsRes.data.recommendations);
        } else {
          console.warn('No recommendations data found in response');
          setRecommendations([]);
        }
        setInsights(insightsRes.data);
        
        // Initialize progress state from API response
        const progressData = userRes.data.progress || {};
        const detailedProgress = userRes.data.detailed_progress || {};
        
        console.log('Progress from API:', progressData);
        console.log('Detailed Progress from API:', detailedProgress);
        
        // Merge progress data
        const mergedProgress = { ...progressData };
        Object.entries(detailedProgress).forEach(([index, data]) => {
          mergedProgress[index] = {
            ...data,
            completed: true
          };
        });
        
        console.log('Setting merged progress:', mergedProgress);
        setProgress(mergedProgress);
        
        // Set analytics with default values if null
        if (analyticsRes.data) {
          setAnalytics(prev => ({
            ...prev,
            ...analyticsRes.data,
            overall_stats: {
              ...prev.overall_stats,
              ...(analyticsRes.data.overall_stats || {})
            }
          }));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Refresh recommendations after completing a step
  const handleComplete = useCallback(async (index, progressData) => {
    console.log('Handling step completion:', { index, progressData });
    setUpdatingStep(index);
    try {
      console.log('Sending progress update:', { step_index: index, ...progressData });
      
      const response = await axios.post(`${config.API_BASE_URL}/update-progress/${userId}`, {
        step_index: index,
        ...progressData
      });
      
      console.log('Progress update API response:', response.data);
      
      // Update progress state with the response data
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [index]: {
            ...progressData,
            completed: true,
            completed_at: new Date().toISOString()
          }
        };
        console.log('New progress state:', newProgress);
        return newProgress;
      });
      
      // Update analytics
      if (response.data.analytics) {
        setAnalytics(prev => ({
          ...prev,
          overall_stats: {
            ...prev.overall_stats,
            ...response.data.analytics
          }
        }));
      }

      // Refresh recommendations after completing a step
      try {
        console.log('Fetching updated recommendations...');
        const recommendationsRes = await axios.get(`${config.API_BASE_URL}/recommendations/${userId}`);
        console.log('New recommendations:', recommendationsRes.data);
        setRecommendations(recommendationsRes.data.recommendations || []);
      } catch (err) {
        console.error('Failed to fetch updated recommendations:', err);
      }

      // Refresh user data to ensure sync
      const userRes = await axios.get(`${config.API_BASE_URL}/user/${userId}`);
      setUserData(userRes.data);
      
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
          <p className="text-sm mt-2">Please check your connection and try refreshing the page</p>
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safely parse learning_path
  let steps = [];
  try {
    steps = Array.isArray(userData.learning_path) 
      ? userData.learning_path 
      : (typeof userData.learning_path === 'string' 
          ? JSON.parse(userData.learning_path || "[]") 
          : []);
  } catch (error) {
    console.error("Error parsing learning path:", error);
    console.log("Raw learning_path:", userData.learning_path);
    steps = [];
  }

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = steps.length ? (completedCount / steps.length) * 100 : 0;

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="flex-1">
          <div className="px-8 py-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-800 rounded-xl">
                <FaBook className="text-2xl text-gray-200" />
          </div>
              <h1 className="text-2xl font-bold text-gray-100">
                E-Learning.AI
              </h1>
            </div>
          </div>

          <nav className="px-8 py-6 space-y-8">
            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-gray-200" />
                  <p className="font-medium text-gray-100">Learning Progress</p>
                </div>
                <span className="text-sm px-3 py-1 bg-gray-800 rounded-full text-gray-100 font-medium">
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

            {/* Analytics Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <FaFire className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Current Streak</p>
                  <p className="font-medium text-gray-100">
                    {analytics.overall_stats.current_streak || 0} days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <FaClock className="text-gray-200" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Total Time</p>
                  <p className="font-medium text-gray-100">
                    {Math.round((analytics.overall_stats.total_time_spent || 0) / 60)} hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <FaBrain className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Avg. Comprehension</p>
                  <p className="font-medium text-gray-100">
                    {Math.round(analytics.overall_stats.average_comprehension || 0)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaCode className="text-gray-200" />
                <p className="font-medium text-gray-100">Skills Acquired</p>
              </div>
              
              {/* Calculate and display skills */}
              {(() => {
                const completedSkills = new Map(); // Using Map to track skill levels
                
                // Get skills from completed steps
                Object.entries(progress).forEach(([stepIndex, stepProgress]) => {
                  if (stepProgress === true || (typeof stepProgress === 'object' && stepProgress.completed === true)) {
                    const step = steps[parseInt(stepIndex)];
                    if (step && step.skills_gained) {
                      step.skills_gained.forEach(skill => {
                        // Update skill level based on comprehension score
                        const comprehensionScore = typeof stepProgress === 'object' ? stepProgress.comprehension_score || 0 : 0;
                        // Calculate new level based on comprehension (starting from 30%)
                        let levelIncrement;
                        if (comprehensionScore >= 70) {
                          levelIncrement = 5; // 5 stars for 70%+
                        } else if (comprehensionScore >= 50) {
                          levelIncrement = 4; // 4 stars for 50-69%
                        } else if (comprehensionScore >= 30) {
                          levelIncrement = 3; // 3 stars for 30-49%
                        } else {
                          levelIncrement = 2; // 2 stars for completing
                        }
                        completedSkills.set(skill, levelIncrement); // Set directly to the earned level
                      });
                    }
                  }
                });

                return completedSkills.size > 0 ? (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {Array.from(completedSkills.entries())
                      .sort(([, levelA], [, levelB]) => levelB - levelA) // Sort by level
                      .map(([skill, level]) => {
                        const roundedLevel = Math.floor(level);
                        const progressPercent = (level / 5) * 100;
                        
                        return (
                          <div key={skill} className="p-3 bg-gray-800 rounded-xl border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-200 font-medium">{skill}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < roundedLevel ? 'text-yellow-500' : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-sm">
                      Complete steps to gain skills
                    </p>
                  </div>
                );
              })()}
            </div>
          </nav>

          {/* Learning Insights */}
          {insights && (
            <div className="px-8 py-6 space-y-4 border-t border-gray-700">
              <h3 className="font-medium text-gray-100">Learning Insights</h3>
              <div className="space-y-4">
                {insights.top_performing_skills?.length > 0 && (
                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-sm text-gray-300 mb-2">Top Skills</p>
                    <div className="space-y-2">
                      {insights.top_performing_skills.map((skillData, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-200">{skillData.skill}</span>
                          <span className="text-gray-400">{Math.round(skillData.score)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-300 mb-2">Learning Velocity</p>
                  <p className="font-medium text-gray-100">
                    {Math.round(insights.learning_velocity || 0)} steps/week
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Section - Moved to bottom */}
        <div className="mt-auto border-t border-gray-700">
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 cursor-pointer p-6 hover:bg-gray-800 transition-colors"
            onClick={toggleDropdown}
          >
            <div className="p-2 bg-gray-800 rounded-xl">
              <FaUserCircle className="text-2xl text-gray-200" />
            </div>
            <div className="flex-1">
              <p className="font-medium truncate text-gray-100">{userData.email}</p>
              <p className="text-sm text-gray-300">Student</p>
            </div>
            <FaChevronDown
              className={`text-gray-200 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
            {dropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-700 
                            rounded-xl shadow-[0_0_15px_3px_rgba(255,255,255,0.1)] overflow-hidden">
                <button
                  onClick={openUserDetails}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-700 transition-colors text-gray-100"
                >
                  <FaUserCircle className="text-gray-200" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => onLogout()}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-100 hover:bg-gray-700 transition-colors"
                >
                  <FaBookmark className="transform rotate-90" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="px-10 py-6 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Your Learning Journey
              </h2>
              <p className="text-gray-300 mt-1">Track your progress and achieve your goals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl border border-gray-700">
                <FaCalendarAlt className="text-gray-200" />
                <span className="text-gray-100">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Learning Steps */}
        <div className="flex-1 overflow-y-auto p-10">
          {/* Recommendations Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Personalized Recommendations</h2>
            {recommendations.length > 0 ? (
              <div className="space-y-6">
                {/* Next Steps */}
                {recommendations.filter(rec => rec.type === 'next_step').length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                        <FaChevronRight className="text-gray-400" />
                        Next Steps
                      </h3>
                      <button
                        onClick={() => setNextStepsExpanded(!nextStepsExpanded)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {nextStepsExpanded ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    {nextStepsExpanded && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {recommendations
                          .filter(rec => rec.type === 'next_step')
                          .map((rec, index) => (
                            <div
                              key={index}
                              className={`p-6 bg-gray-900 rounded-2xl border 
                                        ${rec.priority === 'high' ? 'border-indigo-500/30' : 'border-gray-700'}
                                        shadow-[0_0_15px_3px_rgba(255,255,255,0.1)]
                                        hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)]
                                        transition-all duration-300`}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-xl ${rec.priority === 'high' ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
                                  <FaBook className={`text-xl ${rec.priority === 'high' ? 'text-indigo-400' : 'text-gray-200'}`} />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-100">{rec.step.title}</h3>
                                  <p className="text-sm text-gray-400">Step {rec.step_index + 1}</p>
                                </div>
                              </div>
                              <p className="text-gray-300 mb-4">{rec.step.description}</p>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <FaClock />
                                  <span>{rec.context.estimated_time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <FaChartLine />
                                  <span>Difficulty: {rec.context.difficulty}/5</span>
                                  {rec.context.difficulty_match && (
                                    <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                      Matches your level
                                    </span>
                                  )}
                                </div>
                                {rec.context.skills_to_gain.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {rec.context.skills_to_gain.map((skill, i) => (
                                      <span key={i} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Review Suggestions */}
                {recommendations.filter(rec => rec.type === 'review').length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                        <FaSync className="text-gray-400" />
                        Suggested Reviews
                      </h3>
                      <button
                        onClick={() => setReviewsExpanded(!reviewsExpanded)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {reviewsExpanded ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    {reviewsExpanded && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {recommendations
                          .filter(rec => rec.type === 'review')
                          .map((rec, index) => (
                            <div
                              key={index}
                              className="p-6 bg-gray-900 rounded-2xl border border-yellow-500/30
                                        shadow-[0_0_15px_3px_rgba(255,255,255,0.1)]
                                        hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)]
                                        transition-all duration-300"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-yellow-500/20 rounded-xl">
                                  <FaSync className="text-xl text-yellow-400" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-100">{rec.step.title}</h3>
                                  <p className="text-sm text-gray-400">Completed on {rec.context.completed_at}</p>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <FaChartLine />
                                  <span>Previous Score: {Math.round(rec.context.previous_score)}%</span>
                                </div>
                                <p className="text-gray-300">{rec.context.reason}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Skill Boosters */}
                {recommendations.filter(rec => rec.type === 'skill_booster').length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                      <FaRocket className="text-gray-400" />
                      Skill Boosters
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {recommendations
                        .filter(rec => rec.type === 'skill_booster')
                        .map((rec, index) => (
                          <div
                            key={index}
                            className="p-6 bg-gray-900 rounded-2xl border border-purple-500/30
                                      shadow-[0_0_15px_3px_rgba(255,255,255,0.1)]
                                      hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)]
                                      transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-purple-500/20 rounded-xl">
                                <FaRocket className="text-xl text-purple-400" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-100">{rec.step.title}</h3>
                                <p className="text-sm text-gray-400">Career Goal Alignment</p>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-3">{rec.context.career_impact}</p>
                            {rec.context.aligned_goals.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm text-gray-400">Aligned with your goals:</p>
                                <div className="flex flex-wrap gap-2">
                                  {rec.context.aligned_goals.map((goal, i) => (
                                    <span key={i} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                                      {goal}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {rec.context.skills_to_gain.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm text-gray-400 mb-2">Skills you'll gain:</p>
                                <div className="flex flex-wrap gap-2">
                                  {rec.context.skills_to_gain.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-gray-900 rounded-2xl border border-gray-700 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-xl">
                    <FaBook className="text-3xl text-gray-200" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-100">No Recommendations Yet</h3>
                    <p className="text-gray-400 mt-2">
                      Complete some steps in your current learning path to get personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current Learning Path */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Current Learning Path</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {steps.map((step, index) => {
                const stepProgress = progress[index] || {};
                const isCompleted = stepProgress === true || stepProgress.completed === true;
                
                return (
                  <LearningStepCard
                    key={index}
                    step={step}
                    index={index}
                    isCompleted={isCompleted}
                    updatingStep={updatingStep}
                    onComplete={handleComplete}
                    analytics={typeof stepProgress === 'object' ? stepProgress : null}
                  />
                );
              })}
            </div>
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

<style>
{`
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(75, 85, 99, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
  border-radius: 20px;
  border: transparent;
}
`}
</style>
