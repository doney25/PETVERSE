import React from "react";

import LoginPage from "./components/Loginpage";  // Ensure correct casing
import SignupPage from "./components/SignupPage"; // Import Signup Page
import Home from "./components/Homepage";

function App() {
  return (
    <div>
      <h1>Welcome to PETVERSE</h1>  {/* Add this to check if anything appears */}
      <LoginPage />
      <SignupPage/>
      <Home/>
    </div>
  );
}

export default App; 