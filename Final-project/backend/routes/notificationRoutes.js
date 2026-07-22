const express = require("express");
const router = express.Router();

const notificationController = require("../controller/notificationController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get all notifications
router.get(
  "/",
  protect,
  notificationController.getNotifications
);

// Get unread notification count
router.get(
  "/unread-count",
  protect,
  notificationController.getUnreadCount
);

// Mark one as read
router.patch(
  "/:id/read",
  protect,
  notificationController.markAsRead
);

// Mark all as read
router.patch(
  "/read-all",
  protect,
  notificationController.markAllRead
);

module.exports = router;