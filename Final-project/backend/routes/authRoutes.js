const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");



router.post("/register", authController.registerUser);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.loginUser);
router.post("/send-reset-otp", authController.sendResetOtp);
router.post("/reset-password", authController.resetPassword);

module.exports = router;