const express = require("express");
const router = express.Router();
const timelineController = require("../controllers/timeline-controller");

router.get("/", timelineController.getAll);
router.get("/:id", timelineController.getById);
router.post("/", timelineController.create);
router.put("/:id", timelineController.update);
router.patch("/:id/publish", timelineController.togglePublish); // New Route
router.delete("/:id", timelineController.delete);

module.exports = router;
