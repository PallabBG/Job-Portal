const express = require("express");
const router = express.Router();
const {
  resumeScreening,
  getResumeFeedback,
  getJobRecommendations,
  generateInterviewQuestions,
} = require("../controller/aiController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post(
  "/resume-screening/:applicationId",
  protect,
  allowRoles("employer"),
  resumeScreening
);

router.get(
  "/resume-feedback",
  protect,
  allowRoles("jobseeker"),
  getResumeFeedback
);

router.get(
  "/job-recommendations",
  protect,
  allowRoles("jobseeker"),
  getJobRecommendations
);

router.post(
    "/generate/:jobId",
    protect,
    allowRoles("jobseeker"),
    generateInterviewQuestions
);

module.exports = router;