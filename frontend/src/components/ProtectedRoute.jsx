import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && roleRequired !== userRole) {
    if (userRole === "buyer") {
      return <Navigate to="/shop/home" />;
    } else if (userRole === "admin" || userRole === "seller") {
      return <Navigate to="/dashboard" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
