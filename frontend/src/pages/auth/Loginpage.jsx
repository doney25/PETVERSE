import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/Authcontext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserName, setUserRole } = useContext(AuthContext)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting login request for:", email, password);
    setError("");
    setSuccessMessage("");

    try {
      const { data } = await axios.post(
        "http://localhost:5501/api/users/login",
        { email, password }
      );
      console.log("Login response:", response.data);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.name);

      setUserName(data.user.name);
      setUserRole(data.user.role);
      setSuccessMessage("Login successful!");
      setError("");
      if (data.user.role === "admin" || data.user.role === "seller") {
        navigate("/dashboard"); // Redirect to dashboard for admin or seller
      } else if (data.user.role === "buyer") {
        navigate("/shop/home"); // Redirect to shop home for buyer
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || "Login failed");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {successMessage && (
          <p className="text-green-500 text-sm mt-2 text-center">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <Button
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
