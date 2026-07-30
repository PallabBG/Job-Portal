const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/dashboard", adminController.getDashboardData);
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);
router.put("/users/:id/suspend", adminController.suspendUser);
router.put("/users/:id/verify", adminController.verifyUser);

router.get("/applications", adminController.getAllApplications);
router.delete("/applications/:id", adminController.deleteApplication);

module.exports = router;