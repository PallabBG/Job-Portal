import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";
import { FaRobot } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  useEffect(() => {
    if (!user || !token) return;

    const fetchUnreadChatCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/messages/conversations/${user._id}`
        );
        // Calculate total unread count from all conversations
        const totalUnread = res.data.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);
        setUnreadChatCount(totalUnread);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUnreadChatCount();
    
    // Listen for realtime updates
    socket.on("receiveMessage", fetchUnreadChatCount);
    socket.on("messagesUpdated", fetchUnreadChatCount);
    socket.on("messagesRead", fetchUnreadChatCount);

    return () => {
      socket.off("receiveMessage", fetchUnreadChatCount);
      socket.off("messagesUpdated", fetchUnreadChatCount);
      socket.off("messagesRead", fetchUnreadChatCount);
    };
  }, [user, token]);

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Job Portal
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300 font-medium">
          {/* Public */}
          {!token && (
            <Link
              to="/Home"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium flex items-center gap-1"
            >
              Home
            </Link>
          )}
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Jobs
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          

          <Link
            to="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>

          {(user?.role === "jobseeker" || user?.role === "employer") && (
          <Link
            to="/chat"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center relative"
          >
            Chat
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-2.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm border border-white dark:border-slate-900"></span>
              </span>
            )}
          </Link>
          )}

          {/* Employer */}
          {user?.role === "employer" && (
            <>
              <Link
                to="/employer-dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>

              <Link to="/my-jobs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                My Jobs
              </Link>

              <Link
                to="/add-job"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                + Add Job
              </Link>
            </>
          )}

          {/* Job Seeker */}
          {user?.role === "jobseeker" && (
            <>
              <Link
                to="/jobseeker-dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/job-recommendations"
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaRobot />
                AI Job Match
              </Link>

              <Link
                to="/my-applications"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                My Applications
              </Link>
            </>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin-dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/user-management"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Users
              </Link>
            </>
          )}
          {user?.role === "employer" && (
            <>
              <Link
                to="/user-management"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Candidates
              </Link>
            </>
          )}

          {/* Login/Register */}
          {!token ? (
            <>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
            </>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
