const express = require('express');
const router = express.Router();

const jobctrl = require("../controller/jobController");
const upload = require('../middleware/upload');

//multiple image upload
router.post("/",upload.array("images",5),jobctrl.addjob);
router.get("/", jobctrl.viewjob);
router.get("/search/:keyword", jobctrl.searchjob);
router.get("/:id", jobctrl.singeljob);
router.put("/:id",upload.array("images",5), jobctrl.updatejob);
router.delete("/:id", jobctrl.deletejob);

module.exports = router;