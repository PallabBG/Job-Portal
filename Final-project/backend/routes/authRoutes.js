const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const uploadResume = require("../middleware/uploadResume");

const { protect, allowRoles } = require("../middleware/authMiddleware");
const createUpload = require("../middleware/uploadImage");

const uploadLogo = createUpload("companyLogo");
const uploadProfileImageMiddleware = createUpload("profileImage");

router.post("/register", authController.registerUser);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.loginUser);
router.post("/send-reset-otp", authController.sendResetOtp);
router.post("/reset-password", authController.resetPassword);

router.post("/send-login-otp", authController.sendLoginOtp);
router.post("/verify-login-otp", authController.verifyLoginOtp);

router.get(
    "/profile",
    protect,
    authController.getProfile
);

router.put(
    "/profile",
    protect,
    authController.updateProfile
);
router.put(
    "/upload-resume",
    protect,
    uploadResume.single("resume"),
    authController.uploadResume
);

router.get(
    "/download-resume",
    protect,
    authController.downloadResume
);

router.post(
    "/company-logo",
    protect,
    uploadLogo.single("companyLogo"),
    authController.uploadCompanyLogo
);

router.put(
    "/upload-profile-image",
    protect,
    uploadProfileImageMiddleware.single("profileImage"),
    authController.uploadProfileImage
);

router.get(
    "/profile/:id",
    protect,
    allowRoles("employer", "admin"),
    authController.getCandidateProfile
);


module.exports = router;