const express = require("express");
const router = express.Router();

const controller = require("../controllers/ultimateDream.controller");
const upload = require("../../middlewares/upload");
const { authentication } = require("../../middlewares/auth-middleware");

/* ───────── Public ───────── */
router.get("/", controller.getActive);

/* ───────── Admin (protected) ───────── */
router.get("/admin", authentication, controller.getForAdmin);

router.post("/", authentication, upload.single("image"), controller.create);

router.put("/:id", authentication, upload.single("image"), controller.update);

router.delete("/:id", authentication, controller.remove);

module.exports = router;
