import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // FIXED
console.log("ProtectedRoute token:", token);

  if (!token) {
    return <Navigate to="/user/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    /* TOKEN EXPIRED CHECK */
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/user/login" />;
    }

    return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/user/login" />;
  }
};

export default ProtectedRoute;
