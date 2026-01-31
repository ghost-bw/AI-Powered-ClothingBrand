import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("graphura_admin");
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("graphura_admin");
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminProtectedRoute;
