import { useState, useRef, useEffect } from "react";
import { User, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { unreadCount, fetchUnreadCount } = useNotification();

  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const avatar =
    user?.role === "employer"
      ? user?.companyProfile?.companyLogo
      : user?.profileImage;

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={() => {
          if (!open) {
            fetchUnreadCount();
          }

          setOpen(!open);
        }}
        className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center hover:scale-105 transition overflow-hidden"
      >
        {avatar ? (
          <img
            src={`http://localhost:5500${avatar}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          initials
        )}
      </button>

      {unreadCount > 0 && (
        <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      )}

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">
          <div className="p-5 border-b">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                {avatar ? (
                  <img
                    src={`http://localhost:5500${avatar}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold">{initials}</span>
                )}
              </div>

              <div>
                <h2 className="font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
          >
            <User size={18} />
            My Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/notifications");
            }}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <Bell size={18} />
              <span>Notifications</span>
            </div>

            {unreadCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold">
                  ({unreadCount})
                </span>

                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
            )}
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100">
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;