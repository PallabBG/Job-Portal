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

    getReceiver();
    getMessages();
  }, [loading, currentUser, receiverId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading conversation...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100
dark:from-slate-950 dark:to-slate-900 px-6"
      >
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Please login first
          </h2>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem("token");

  const getReceiver = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/auth/user/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReceiver(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/messages/${currentUser._id}/${receiverId}`,
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
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
