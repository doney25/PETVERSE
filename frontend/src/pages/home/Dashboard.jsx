import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Admin from "./Admin";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch role from localStorage (or API if needed)
    const role = localStorage.getItem("userRole");

    if (!role) {
      navigate("/login"); // Redirect if no role is found
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  if (!userRole) return <p>Loading...</p>;

  return (
    <>
      {userRole === "buyer" && <Buyer />}
      {userRole === "seller" && <Seller />}
      {userRole === "admin" && <Admin />}
    </>
  );
};

export default Dashboard;
