import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
    // window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
