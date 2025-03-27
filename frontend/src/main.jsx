import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import { CartProvider } from "./context/CartContext";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <CartProvider>
        <SnackbarProvider autoHideDuration={2000}>
          <App />
        </SnackbarProvider>
      </CartProvider>
    </BrowserRouter>
  </AuthProvider>
);
