import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react"; // Import useState

import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ChatPage from "./components/ChatPage";
import PetDetails from "./pages/PetDetails";

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user info

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);
