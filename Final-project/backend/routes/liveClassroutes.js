const express = require("express");
const router = express.Router();
const lctrl = require("../controller/liveClassController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/",protect,allowRoles("admin","employer"),lctrl.createLiveclass);
router.get("/",lctrl.getliveclasses);
router.get("/:id",lctrl.getsingelliveclasses);
router.put("/:id",lctrl.updateliveclasses);
router.delete("/:id",lctrl.deleteliveclasses);

module.exports = router;