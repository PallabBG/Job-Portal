import { useState } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const JobChatbot = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I am your AI job assistant. Tell me what you want to Do.",
        },
    ]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userText,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5500/api/chatbot/job-recommend",
                {
                    message: userText,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: res.data.reply,
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text:
                        error.response?.data?.reply ||
                        "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const enterSend = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 text-white p-5 flex items-center gap-3">
                    <FaRobot className="text-3xl" />

                    <div>
                        <h1 className="text-2xl font-bold">
                            AI Job Recommendation Chatbot
                        </h1>

                        <p className="text-sm text-blue-100">
                            Ask me which Job is best for you
                        </p>
                    </div>
                </div>

                <div className="h-[550px] overflow-y-auto bg-gray-50 p-5">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.sender === "user"
                                            ? "bg-green-600 text-white"
                                            : "bg-blue-600 text-white"
                                        }`}
                                >
                                    {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                                </div>

                                <div
                                    className={`p-4 rounded-2xl whitespace-pre-line ${msg.sender === "user"
                                            ? "bg-green-600 text-white"
                                            : "bg-white border text-gray-800"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <p className="text-gray-500 text-sm">
                            AI is typing...
                        </p>
                    )}
                </div>

                <div className="p-5 border-t bg-white flex gap-3">
                    <input
                        type="text"
                        placeholder="Example: I want to learn React"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={enterSend}
                        className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 flex items-center gap-2 disabled:bg-gray-400"
                    >
                        <FaPaperPlane />
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobChatbot;