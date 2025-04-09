import LogoutModal from "@/components/LogoutModal";
import { enqueueSnackbar } from "notistack";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    if (storedRole || storedName) {
      setUserRole(storedRole);
      setUserName(storedName); // fixed this too
    }
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUserName(null);
    setUserRole(null);
    setShowModal(false);
    enqueueSnackbar("Logout Successful!", {variant:"success"})
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        userRole,
        setUserRole,
        logout: () => setShowModal(true), // trigger modal
      }}
    >
      {children}

      {/* Modal is rendered here */}
      <LogoutModal
        isOpen={showModal}
        onConfirm={() => {
          confirmLogout()
          navigate('/')
        }}
        onCancel={() => setShowModal(false)}
      />
    </AuthContext.Provider>
  );
};
