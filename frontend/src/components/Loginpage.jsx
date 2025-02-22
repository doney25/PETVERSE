import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Use correct backend port
            const { data } = await axios.post("http://localhost:5500/api/users/login", { email, password }); 
            localStorage.setItem("token", data.token);
            // setUser(data.user);
            setSuccessMessage("Login successful!");
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button>Log In</Button>
            </form>
        </div>
    );
};

export default LoginPage;
