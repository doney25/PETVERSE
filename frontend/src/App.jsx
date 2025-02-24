import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Loginpage";  // Ensure correct casing
import SignupPage from "./components/SignupPage"; // Import Signup Page

function App() {
  return (
    <div>
      <h1>Welcome to PETVERSE</h1>  {/* Add this to check if anything appears */}
      <LoginPage />
      <SignupPage/>
    </div>
  );
}

export default App; 