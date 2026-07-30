import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL; // Change if you already have API_BASE
  console.log(import.meta.env.VITE_API_URL);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      console.log("Profile API Response:", res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (user?._id) {
      socket.emit("leave", user._id);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Join Socket.IO after user is loaded
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
      console.log("Socket Joined:", user._id);
      
      const handleSuspension = () => {
        alert("Your account has been suspended by an administrator.");
        logout();
        window.location.href = "/login";
      };

      socket.on("accountSuspended", handleSuspension);

      return () => {
        socket.off("accountSuspended", handleSuspension);
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        loadProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
