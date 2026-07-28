import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaChevronRight } from "react-icons/fa";

const ConversationPage = () => {
  const { user, loading } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (loading || !user) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/messages/conversations/${user._id}`,
        );

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConversations();
  }, [loading, user]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (!user) return <div className="p-10">Please login first.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Conversations
        </h1>

        <div className="space-y-5">
          {users.length === 0 ? (
            <div className="text-gray-500">No conversations yet.</div>
          ) : (
            users.map((u) => (
              <Link key={u._id} to={`/chat/${u._id}`} className="block">
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        u.role === "employer"
                          ? u.companyProfile?.companyLogo
                            ? `http://localhost:5500${u.companyProfile.companyLogo}`
                            : "/company-placeholder.png"
                          : u.profileImage
                            ? `http://localhost:5500${u.profileImage}`
                            : "/default-avatar.png"
                      }
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover bg-white border border-gray-200 dark:border-slate-600 shadow-sm shrink-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          u.role === "employer"
                            ? "/company-placeholder.png"
                            : "/default-avatar.png";
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                        {u.role === "employer"
                          ? u.companyProfile?.companyName || u.name
                          : u.name}
                      </h2>

                      <p className="inline-block mt-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">{u.role}</p>
                    </div>
                    <FaChevronRight className="text-gray-400 dark:text-gray-500 text-lg" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
