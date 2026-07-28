const express = require("express");
const router = express.Router();
const mctrl = require("../controller/messageController");

// Specific routes first
router.get("/conversations/:userId", mctrl.getConversations);
router.get("/unread-count/:userId", mctrl.getUnreadCount);
router.put("/mark-read/:senderId/:receiverId", mctrl.markAsRead);

// Generic routes last
router.get("/:senderId/:receiverId", mctrl.getmessages);

module.exports = router;