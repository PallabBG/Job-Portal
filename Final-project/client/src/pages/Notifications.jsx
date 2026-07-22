import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, CheckCheck } from "lucide-react";
import socket from "../socket";
import { useNotification } from "../context/NotificationContext";

const Notifications = () => {
  const { fetchUnreadCount } = useNotification();
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Real-time notification updates
  useEffect(() => {
    const handleNotification = () => {
      fetchNotifications();
    };

    socket.on("receiveNotification", handleNotification);

    return () => {
      socket.off("receiveNotification", handleNotification);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5500/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.patch(
        "http://localhost:5500/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchNotifications();
      await fetchUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  // Click notification
  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification._id);
        await fetchUnreadCount();
      }

      if (notification.link) {
        navigate(notification.link);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bell />
          Notifications
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <CheckCheck size={18} />
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleNotificationClick(notification)}
              className={`cursor-pointer rounded-xl border p-5 shadow-sm transition hover:bg-gray-100 ${
                notification.isRead ? "bg-white" : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">
                    {notification.title}
                  </h2>

                  <p className="text-gray-600 mt-2">{notification.message}</p>

                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification._id);
                    }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
