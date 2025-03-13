import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seller from "./Seller";
import Admin from "./Admin";
import { AuthContext } from "@/context/Authcontext";

const Dashboard = () => {
  const { userRole, setUserRole } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (!storedRole) {
      navigate("/login");
      return
    }
  }, [userRole, navigate]);

  return (
    <>
      {userRole === "seller" && <Seller />}
      {userRole === "admin" && <Admin />}
    </>
  );
};

export default Dashboard; 
