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
import CartPage from "./pages/buyer/CartPage";
import ProductDetails from "./pages/buyer/ProductDetails";
import CheckoutPage from "./pages/buyer/CheckoutPage"
import { CartProvider } from "./context/CartContext";
import PredictBreed from "./pages/PetBreed";
import OrderSuccessPage from "./pages/buyer/OrderSuccessPage";
import MyOrdersPage from "./pages/buyer/MyOrdersPage";
import SingleOrder from "./pages/buyer/SingleOrder";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BuyNow from "./pages/buyer/BuyNow";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/predict-breed" element={<PredictBreed />} /> {/* New Route */}

      {/* Buyer Routes */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route
        path="/shop/*"
        element={
          <CartProvider>
            <ProtectedRoute roleRequired="buyer" />
          </CartProvider>
        }
      >
        <Route path="home" element={<Buyer />} />
        <Route
          path="chat/:buyerId/:sellerId"
          element={<BuyerChatComponent />}
        />
        <Route path="chat/:userId" element={<ChatList />} />

        <Route path="pets/:category" element={<PetListings />} />
        <Route path="pets" element={<PetListings />} />
        <Route path="pets/:category/:petId" element={<PetDetails />} />

        {/* Product Routes */}
        <Route path="products" element={<ProductListings />} />
        <Route path="products/:category" element={<ProductListings />} />
        <Route
          path="products/:category/:productId"
          element={<ProductDetails />}
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="my-orders/:userId" element={<MyOrdersPage />} />
        <Route path="orders/:orderId" element={<SingleOrder />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/:itemId" element={<BuyNow />} />
        <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
      </Route>

      {/* Seller and Admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;