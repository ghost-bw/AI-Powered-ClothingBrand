import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/user/login");

    // Fetch user data from backend
    fetch("/api/auth/profile", {   // <-- fixed route
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUserData(data.user)) // data.user contains the actual user
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/user/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7]">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {userData?.name || "User"}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-[#2F2C79] text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
