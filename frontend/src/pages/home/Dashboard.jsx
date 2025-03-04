import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Admin from "./Admin";
import { AuthContext } from "@/context/Authcontext";

const Dashboard = () => {
  const { role } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <>
      {role === "buyer" && <Buyer />}
      {role === "seller" && <Seller />}
      {role === "admin" && <Admin />}
    </>
  );
};

export default Dashboard;
