import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MessageProvider } from "./context/MessageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <MessageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MessageProvider>
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
);
