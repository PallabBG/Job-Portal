const express = require("express");
const router = express.Router();

const { protect, optionalProtect, allowRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const jobctrl = require("../controller/jobController");

// ======================
// Public Routes
// ======================

router.get("/", jobctrl.viewjob);

router.get("/search", jobctrl.searchjob);

router.post("/nearby", jobctrl.getNearbyJobs);

// ======================
// Employer Routes
// ======================

router.get(
  "/my-jobs",
  protect,
  allowRoles("employer"),
  jobctrl.getEmployerJobs
);

router.get(
  "/employer-dashboard",
  protect,
  allowRoles("employer"),
  jobctrl.getEmployerDashboard
);

router.post(
  "/",
  protect,
  allowRoles("employer"),
  upload.array("images", 5),
  jobctrl.addjob
);

router.put(
  "/:id",
  protect,
  allowRoles("employer"),
  upload.array("images", 5),
  jobctrl.updatejob
);

router.delete(
  "/:id",
  protect,
  allowRoles("employer", "admin"),
  jobctrl.deletejob
);

// ======================
// Dynamic Route (LAST)
// ======================

router.get("/:id", optionalProtect, jobctrl.singeljob);

module.exports = router;