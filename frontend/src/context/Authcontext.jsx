import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            axios.get("http://localhost:5500/api/users/profile", {
                headers: { Authorization: token },
            }).then(({ data }) => setUser(data))
              .catch(() => setUser(null));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
