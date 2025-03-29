import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
    </BrowserRouter>
  </AuthProvider>
);
