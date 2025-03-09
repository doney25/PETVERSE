import React from "react";
import LoginPage from "./pages/auth/Loginpage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/home/Home";
import ChatPage from "./components/ChatPage";
import PetDetails from "./pages/PetDetails";
import PurchasePage from "./pages/PurchasePage";
import Dashboard from "./pages/home/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pet-details/:id" element={<PetDetails />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/purchase/:id" element={<PurchasePage />} />   
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
