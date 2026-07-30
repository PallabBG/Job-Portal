import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import { useAuth } from "./AuthContext";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { user } = useAuth();

  const fetchUnreadMessageCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !user) {
        setUnreadMessageCount(0);
        return;
      }

      const res = await axios.get(
        `https://job-portal-v3nf.onrender.com/api/messages/unread-count/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUnreadMessageCount(res.data.unreadCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnreadMessageCount();

    const handleReceiveMessage = (msg) => {
      // Fetch the latest count from backend when receiving a message
      fetchUnreadMessageCount();
    };

    const handleMessagesUpdated = () => {
      fetchUnreadMessageCount();
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messagesUpdated", handleMessagesUpdated);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messagesUpdated", handleMessagesUpdated);
    };
  }, [user]);

  return (
    <MessageContext.Provider
      value={{
        unreadMessageCount,
        setUnreadMessageCount,
        fetchUnreadMessageCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
