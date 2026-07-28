import { useEffect, useRef, useState } from "react";

const Chatbox = ({
  socket,
  currentUser,
  receiver,
  receiverId,
  oldMessages,
}) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef();

  useEffect(() => {
    if (oldMessages && oldMessages.length > 0) {
      setMessages(oldMessages);
    }
  }, [oldMessages]);

  useEffect(() => {
    const handleReceive = (data) => {
      setMessages((prev) => {
        // Prevent duplicate messages if already in state
        if (prev.find((msg) => msg._id === data._id)) return prev;
        return [...prev, data];
      });
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      senderId: currentUser._id,
      senderName: currentUser.name,
      senderRole: currentUser.role,

      receiverId,

      message,
    };

    socket.emit("sendMessage", data);

    setMessage("");
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300 h-[calc(100vh-150px)] flex flex-col">
      <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
        {receiver ? (
          <>
            <img
              src={
                receiver?.role === "employer"
                  ? receiver?.companyProfile?.companyLogo
                    ? `http://localhost:5500${receiver.companyProfile.companyLogo}`
                    : "/company-placeholder.png"
                  : receiver?.profileImage
                    ? `http://localhost:5500${receiver.profileImage}`
                    : "/default-avatar.png"
              }
              alt=""
              className="w-14 h-14 rounded-2xl object-cover border border-gray-200 dark:border-slate-600 bg-white"
              onError={(e) => {
                e.currentTarget.src =
                  receiver?.role === "employer"
                    ? "/company-placeholder.png"
                    : "/default-avatar.png";
              }}
            />

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {receiver?.role === "employer"
                  ? receiver?.companyProfile?.companyName || receiver?.name
                  : receiver?.name || "Loading..."}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {receiver?.role === "employer"
                  ? receiver?.companyProfile?.industry || "Employer"
                  : "Job Seeker"}
              </p>
            </div>
          </>
        ) : (
          <div className="h-14 flex items-center text-gray-500 dark:text-gray-400">
            Loading profile...
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 px-8 py-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.senderId === currentUser._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-5 py-3 rounded-3xl shadow-md max-w-[75%] break-words ${
                msg.senderId === currentUser._id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
              }`}
            >
              <p
                className={`text-xs font-semibold mb-2 ${
                  msg.senderId === currentUser._id
                    ? "text-blue-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {msg.senderName}
              </p>

              <p>{msg.message}</p>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-3 p-5 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 rounded-xl transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
