import { useEffect, useRef, useState } from "react";

const Chatbox = ({
  socket,
  currentUser,
  receiverId,
  receiverName,
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
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <h2 className="text-2xl font-bold mb-5">
        Chat with {receiverName}
      </h2>

      <div className="h-[500px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.senderId === currentUser._id
                ? "justify-end"
                : "justify-start"
              }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[70%] ${msg.senderId === currentUser._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
                }`}
            >
              <p className="text-sm font-bold mb-1">
                {msg.senderName}
              </p>

              <p>{msg.message}</p>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-3 mt-5">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="flex-1 border p-3 rounded-lg"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;