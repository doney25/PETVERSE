import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch Cart Items from Backend
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:5501/api/cart/${userId}`)
        .then((res) => setCart(res.data.items))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, []);

  // Add Item to Cart
  const handleAddToCart = async (item) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please log in first!");

      const res = await axios.post(`http://localhost:5501/api/cart/add`, {
        userId,
        ...item,
      });

      setCart(res.data.cart.items); // Update cart state
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove Item from Cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please log in first!");

      const res = await axios.post(`http://localhost:5501/api/cart/remove`, {
        userId,
        itemId,
      });

      setCart(res.data.cart.items); // Update cart state
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
