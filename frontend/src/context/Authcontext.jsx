import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    if (storedRole || storedName) {
      setUserRole(storedRole);
      setUserName(storedName.name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUserName(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userName, setUserName, userRole, setUserRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
