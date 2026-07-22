const express = require("express");
const router = express.Router();

const applicationController = require("../controller/applicationController");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

router.post(
  "/apply/:jobId",
  protect,
  allowRoles("jobseeker"),
  applicationController.applyJob
);

// Job Seeker
router.get(
  "/my-applications",
  protect,
  allowRoles("jobseeker"),
  applicationController.getMyApplications
);

// Employer/Admin
router.get(
  "/job/:jobId",
  protect,
  allowRoles("employer", "admin"),
  applicationController.getApplicants
);

// Employer/Admin
router.patch(
  "/:id/status",
  protect,
  allowRoles("employer", "admin"),
  applicationController.updateApplicationStatus
);
router.get(
  "/jobseeker-dashboard",
  protect,
  allowRoles("jobseeker"),
  applicationController.getJobseekerDashboard
);

module.exports = router;