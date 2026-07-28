import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, MessageSquare, Search, Circle } from "lucide-react";
import socket from "../socket";

const ConversationPage = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (loading || !user) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/messages/conversations/${user._id}`
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConversations();
    
    // Listen for realtime updates
    socket.on("receiveMessage", fetchConversations);
    socket.on("messagesUpdated", fetchConversations);

    return () => {
      socket.off("receiveMessage", fetchConversations);
      socket.off("messagesUpdated", fetchConversations);
    };
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center max-w-sm w-full border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Please login first</h2>
          <Link to="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-500/30">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter((u) => {
    const name = u.role === "employer" ? (u.companyProfile?.companyName || u.name) : u.name;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Header Background */}
      <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-700 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        
        {/* Page Header & Search */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Messages</h1>
            <p className="text-slate-500 font-medium">Connect and chat with {user.role === 'employer' ? 'candidates' : 'employers'}.</p>
          </div>
          
          <div className="relative group w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all dark:text-white font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                No conversations found
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {searchQuery ? "Try adjusting your search terms." : "You haven't started any conversations yet."}
              </p>
            </div>
          ) : (
            filteredUsers.map((u) => {
              const displayName = u.role === "employer" ? (u.companyProfile?.companyName || u.name) : u.name;
              const displayImage = u.role === "employer" 
                ? (u.companyProfile?.companyLogo ? `http://localhost:5500${u.companyProfile.companyLogo}` : "/company-placeholder.png")
                : (u.profileImage ? `http://localhost:5500${u.profileImage}` : "/default-avatar.png");
              const hasUnread = u.unreadCount > 0;

              return (
                <Link key={u._id} to={`/chat/${u._id}`} className="block group">
                  <div className={`bg-white dark:bg-slate-900 border ${hasUnread ? 'border-blue-300 dark:border-blue-500/50 shadow-md shadow-blue-500/5 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-slate-800'} rounded-3xl p-4 sm:p-5 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 flex items-center justify-between`}>
                    
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={displayImage}
                          alt={displayName}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = u.role === "employer" ? "/company-placeholder.png" : "/default-avatar.png";
                          }}
                        />
                        {hasUnread && (
                          <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-[11px] font-black rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-bounce-slow">
                            {u.unreadCount}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-lg sm:text-xl truncate mb-1 transition-colors ${hasUnread ? 'font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' : 'font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                          {displayName}
                        </h2>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                            u.role === 'employer' 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'
                          }`}>
                            {u.role}
                          </span>
                          
                          {hasUnread && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                              <Circle className="w-2 h-2 fill-current" />
                              New messages
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-colors ml-4 hidden sm:flex">
                      <ChevronRight className="w-5 h-5" />
                    </div>

                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;;
