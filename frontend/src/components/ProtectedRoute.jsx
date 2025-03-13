import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roleRequired, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  if (roleRequired && roleRequired !== userRole) {
    // Redirect based on the role. If roleRequired doesn't match, redirect to a different page
    if (userRole === "buyer") {
      return <Navigate to="/shop/home" />;
    } else if (userRole === "admin" || userRole === "seller"){
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

export default ProtectedRoute;
