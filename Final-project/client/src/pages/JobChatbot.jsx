import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const JobChatbot = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your AI job assistant. Tell me what you want to Do.",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
        "https://job-portal-v3nf.onrender.com/api/chatbot/job-recommend",
        {
          message: userText,
        },
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

  const quickPrompts = [
    "Review my Resume",
    "Prepare me for Interview",
    "Recommend Jobs",
    "Career Roadmap",
  ];

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-5xl mx-auto h-full px-4 lg:px-6 py-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-white text-lg" />
              </div>

              <div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  AI Career Assistant
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Resume review · Interview prep · Career roadmap · Job recommendations
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setInput("Review my resume")}
                className="rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
              >
                Resume
              </button>

              <button
                onClick={() => setInput("Prepare me for interview")}
                className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
              >
                Interview
              </button>

              <button
                onClick={() => setInput("Recommend jobs for me")}
                className="rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-3 py-1.5 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
              >
                Jobs
              </button>

              <button
                onClick={() => setInput("Suggest skills to learn")}
                className="rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3 py-1.5 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
              >
                Skills
              </button>
            </div>
          </div>
        </div>

        {/* Chat Card */}
        <div className="flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
          {/* Chat Header */}
          <div className="flex-shrink-0 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-white text-sm" />
              </div>

              <div>
                <h2 className="font-medium text-sm text-slate-900 dark:text-white">
                  Career Chat
                </h2>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Online
                </p>
              </div>
            </div>

            <div className="hidden md:block text-xs text-slate-400 dark:text-slate-500">
              Powered by AI
            </div>
          </div>

          {/* Scrollable message area */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
            {messages.length === 1 && !loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="max-w-lg text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
                    <FaRobot className="text-2xl text-white" />
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                    Welcome
                  </h2>

                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-6">
                    I'm your AI Career Assistant. Ask me anything about jobs,
                    interviews, resumes, salaries, learning roadmaps or career
                    guidance.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {[
                      "Review my Resume",
                      "Interview Preparation",
                      "Recommend Jobs",
                      "Highest Paying Skills",
                      "Career Roadmap",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setInput(item)}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${
                        msg.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
                          msg.sender === "user"
                            ? "bg-emerald-600 text-white"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        {msg.sender === "user" ? <FaUser /> : <FaRobot />}
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`rounded-2xl px-4 py-3 whitespace-pre-wrap break-words text-sm ${
                            msg.sender === "user"
                              ? "bg-indigo-600 text-white rounded-tr-sm"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm"
                          }`}
                        >
                          <p className="leading-6">{msg.text}</p>
                        </div>

                        <p
                          className={`mt-1 text-xs text-slate-400 dark:text-slate-500 px-1 ${
                            msg.sender === "user" ? "text-right" : ""
                          }`}
                        >
                          {msg.sender === "user" ? "You" : "AI Assistant"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                        <FaRobot />
                      </div>

                      <div className="rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
                            style={{ animationDelay: ".15s" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
                            style={{ animationDelay: ".3s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  onClick={() => setInput(item)}
                  className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                placeholder="Ask about jobs, interviews, resumes, career roadmap..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={enterSend}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="h-[46px] px-5 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              >
                <FaPaperPlane className="text-xs" />
                <span className="hidden sm:block">Send</span>
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
              AI can make mistakes. Always verify important career advice,
              salary information and job details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobChatbot;
