import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import ChatBox from "../components/Chatbox";
import { Link } from "react-router-dom";

const Chatpage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const [messages, setMessages] = useState([]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
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

  const adminUser = {
    _id: "69f4ccd7fa6e6029a17b5f19",
    name: "Admin",
  };

  const jobseekerUser = {
    _id: "69f6e12717b981d4ac9e3cf9",
    name: "Jobseeker",
  };

  const receiverId =
    currentUser.role === "admin" ? jobseekerUser._id : adminUser._id;

  const receiverName =
    currentUser.role === "admin" ? jobseekerUser.name : adminUser.name;

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/messages/${currentUser._id}/${receiverId}`
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.emit("join", currentUser._id);
    getMessages();

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <ChatBox
          socket={socket}
          currentUser={currentUser}
          receiverId={receiverId}
          receiverName={receiverName}
          oldMessages={messages}
        />
      </div>
    </div>
  );
};

export default Chatpage;