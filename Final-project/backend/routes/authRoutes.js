const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {sendResetOtp,resetPassword} = require("../controller/authController");


router.post("/register", authController.registerUser);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.loginUser);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router;