import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect based on role
    return <Navigate to={role === "admin" ? "/admin/login" : "/user/login"} />;
  }

  // Optional: decode token to check role
  // const decoded = jwtDecode(token);
  // if (role && decoded.role !== role) return <Navigate to="/user/login" />;

  return children;
};

export default ProtectedRoute;
