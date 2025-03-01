import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ChatPage from "./components/ChatPage";
import PetDetails from "./pages/PetDetails";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/pet-details/:id" element={<PetDetails />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>
);
