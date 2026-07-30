import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import ChatBox from "../components/Chatbox";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Chatpage = () => {
  const { user: currentUser, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const { receiverId } = useParams();
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (loading || !currentUser || !receiverId) return;

    socket.emit("join", currentUser._id);

    const markAsReadAndFetch = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`${import.meta.env.VITE_API_URL}/api/messages/mark-read/${receiverId}/${currentUser._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Emit event so other tabs sync unread count
        socket.emit("messagesRead");
      } catch (error) {
        console.error("Failed to mark messages as read", error);
      }
      
      getReceiver();
      getMessages();
    };

    markAsReadAndFetch();
  }, [loading, currentUser, receiverId]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center max-w-sm w-full border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please login first</h2>
          <Link to="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-500/30">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const getReceiver = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/user/${receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceiver(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/${currentUser._id}/${receiverId}`
      );
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-6 sm:py-8 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto h-[calc(100vh-140px)]">
        <ChatBox
          socket={socket}
          currentUser={currentUser}
          receiver={receiver}
          receiverId={receiverId}
          oldMessages={messages}
        />
      </div>
    </div>
  );
};

export default Chatpage;
