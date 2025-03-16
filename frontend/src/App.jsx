import React from "react";
import LoginPage from "./pages/auth/Loginpage";
import SignupPage from "./pages/auth/SignupPage";
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Buyer from "./pages/home/Buyer";
import BuyerChatComponent from "./components/buyer/BuyerChatComponent";
import PetListings from "./pages/buyer/PetListings";
import ProductListings from "./pages/buyer/ProductListings";
import PetDetails from "./pages/buyer/PetDetails";
import ChatList from "./components/buyer/BuyerChatList";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/pet-details/:id" element={<PetDetails />} /> */}
      {/* <Route path="/chat" element={<ChatPage />} /> */}
      {/* <Route path="/purchase/:id" element={<PurchasePage />} /> */}
      {/* Buyer Routes */}
      <Route path="/shop/*" element={<ProtectedRoute roleRequired="buyer" />}>
        <Route path="home" element={<Buyer />} />
        <Route
          path="chat/:buyerId/:sellerId"
          element={<BuyerChatComponent />}
        />
        <Route path="chat/:userId" element={<ChatList />} />

        <Route path="pets/:category" element={<PetListings />} />
        <Route path="pets" element={<PetListings />} />
        <Route path="pets/:category/:petId" element={<PetDetails />} />

        <Route path="products" element={<ProductListings />} />
        <Route path="products/:category" element={<ProductListings />} />
      </Route>
      {/* Seller and Admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/chat/:buyerId/:sellerId"
          element={
            <SellerChatComponent
              buyerId={"67c7d476148281d249f2c67a"}
              sellerId={"67c4180657692f021854cbac"}
            />
          }
        /> */}
      </Route>
    </Routes>
  );
}

export default App;
