import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  console.log("USER TOKEN:", token);

  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    console.log("DECODED USER:", decoded);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/user/login" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/user/login" replace />;
  }
};

export default ProtectedRoute;
