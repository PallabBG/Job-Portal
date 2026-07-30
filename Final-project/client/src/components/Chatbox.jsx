import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Send, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";

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
    const handleReceive = async (data) => {
      setMessages((prev) => {
        if (prev.find((msg) => msg._id === data._id)) return prev;
        return [...prev, data];
      });

      if (data.senderId === receiverId) {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/messages/mark-read/${receiverId}/${currentUser._id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          socket.emit("messagesRead");
        } catch (error) {
          console.error("Failed to auto-mark message as read", error);
        }
      }
    };

    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [receiverId, currentUser]);

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

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden transition-colors duration-300 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 sticky top-0">
        <Link to="/chat" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        {receiver ? (
          <>
            <div className="relative shrink-0">
              <img
                src={
                  receiver?.role === "employer"
                    ? receiver?.companyProfile?.companyLogo
                      ? receiver.companyProfile.companyLogo?.startsWith('http') ? receiver.companyProfile.companyLogo : `${import.meta.env.VITE_API_URL}${receiver.companyProfile.companyLogo}`
                      : "/company-placeholder.png"
                    : receiver?.profileImage
                      ? receiver.profileImage?.startsWith('http') ? receiver.profileImage : `${import.meta.env.VITE_API_URL}${receiver.profileImage}`
                      : "/default-avatar.png"
                }
                alt=""
                className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-white"
                onError={(e) => {
                  e.currentTarget.src = receiver?.role === "employer" ? "/company-placeholder.png" : "/default-avatar.png";
                }}
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {receiver?.role === "employer"
                  ? receiver?.companyProfile?.companyName || receiver?.name
                  : receiver?.name || "Loading..."}
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {receiver?.role === "employer"
                  ? receiver?.companyProfile?.industry || "Employer"
                  : "Job Seeker"}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            <div>
              <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-2"></div>
              <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 px-4 sm:px-8 py-6 flex flex-col gap-6 scroll-smooth">
        
        {/* End-to-end encryption banner */}
        <div className="flex justify-center mb-4">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
            Messages are securely transmitted
          </span>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser._id;
          const showAvatar = !isMe && (index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId);

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group`}
            >
              {/* Receiver Avatar (shows on last message of a block) */}
              {!isMe && (
                <div className="w-8 shrink-0">
                  {showAvatar && receiver && (
                    <img
                      src={
                        receiver?.role === "employer"
                          ? receiver?.companyProfile?.companyLogo
                            ? receiver.companyProfile.companyLogo?.startsWith('http') ? receiver.companyProfile.companyLogo : `${import.meta.env.VITE_API_URL}${receiver.companyProfile.companyLogo}`
                            : "/company-placeholder.png"
                          : receiver?.profileImage
                            ? receiver.profileImage?.startsWith('http') ? receiver.profileImage : `${import.meta.env.VITE_API_URL}${receiver.profileImage}`
                            : "/default-avatar.png"
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      onError={(e) => { e.currentTarget.src = "/default-avatar.png"; }}
                    />
                  )}
                </div>
              )}

              <div
                className={`px-5 py-3.5 shadow-sm max-w-[85%] sm:max-w-[70%] break-words relative ${
                  isMe
                    ? "bg-blue-600 text-white rounded-3xl rounded-br-sm"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl rounded-bl-sm border border-slate-100 dark:border-slate-700/50"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                <span className={`text-[10px] font-medium absolute ${isMe ? "-left-12 bottom-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" : "-right-12 bottom-0 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"}`}>
                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} className="h-4"></div>
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          
          <button className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner font-medium text-sm"
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-lg shadow-blue-500/30 group"
          >
            <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Chatbox;
