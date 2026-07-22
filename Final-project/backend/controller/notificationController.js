const Notification = require("../models/Notification");

// Get all notifications of logged in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch notifications.",
    });
  }
};

// Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      receiver: req.user.id,
      isRead: false,
    });

    res.status(200).json({
      unreadCount: count,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch unread count.",
    });
  }
};

// Mark one notification as read
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.status(200).json({
      message: "Notification marked as read.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update notification.",
    });
  }
};

// Mark all notifications as read
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiver: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      message: "All notifications marked as read.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update notifications.",
    });
  }
};