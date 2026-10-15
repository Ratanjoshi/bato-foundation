const express = require("express");
const router = express.Router();

const controller = require("../controllers/ultimate-dream-controller");
const { authentication } = require("../../middlewares/auth-middleware");
const validation = require("../../validations/ultimate-dream-validation");

/* ───────── Public ───────── */
router.get("/", controller.getActive);

/* ───────── Admin (protected) ───────── */
router.get("/admin", authentication, controller.getForAdmin);

router.post(
  "/",
  authentication,
  validation.json,
  validation.create,
  controller.create,
);

router.put(
  "/:id",
  authentication,
  validation.json,
  validation.update,
  controller.update,
);

router.delete("/:id", authentication, controller.remove);

module.exports = router;
