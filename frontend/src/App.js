import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import AuthForm from "./components/AuthForm";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAuthSuccess = (id) => {
    setUserId(id);
    localStorage.setItem("user_id", id);
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem("user_id");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {userId ? (
        <>
          <button
            onClick={handleLogout}
            className="mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
          <UserForm userId={userId} />
        </>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
