const express = require("express");
const router = express.Router();
const chatctrl = require("../controller/chatbotController");

router.post("/job-recommend",chatctrl.jobchatbot);

module.exports = router;