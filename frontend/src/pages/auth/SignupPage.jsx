import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import API_BASE_URL from "@/config.js";
import Header from "@/components/layout/Header";
import OverlaySpinner from "@/components/ui/OverlaySpinner";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      enqueueSnackbar("Passwords do not match!", { variant: "error" });
      setLoading(false);
      return;
    }

    if (!role) {
      setError("Please select a role.");
      enqueueSnackbar("Please select a role", { variant: "warning" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/signup`, {
        name,
        email,
        password,
        role,
      });

      enqueueSnackbar(
        "Signup successful! Check your email to verify your account.",
        { variant: "success" }
      );
      setSuccessMessage("Signup successful! Please check your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      enqueueSnackbar(err.response?.data?.error || "Signup failed", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <OverlaySpinner />
      ) : (
        <>
          <Header />
          <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-300">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-2xl">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
                Create Your Account
              </h2>
              <p className="text-gray-500 text-center mb-4">
                Join Petverse today!
              </p>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm text-center">
                  {successMessage}
                </p>
              )}

              <form onSubmit={handleSignup} className="mt-6">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="mb-4 flex justify-center gap-4">
                  {["buyer", "seller"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-6 py-2 text-sm font-semibold rounded-lg transition shadow-md ${
                        role === r
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>

                <Button
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>

              <p className="text-center text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignupPage;
