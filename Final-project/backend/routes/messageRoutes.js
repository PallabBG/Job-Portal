const express = require("express");
const router = express.Router();
const mctrl = require("../controller/messageController");

router.get(
  "/conversations/:userId",
  mctrl.getConversations
);
router.get("/:senderId/:receiverId",mctrl.getmessages);

module.exports = router;