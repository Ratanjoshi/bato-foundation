// backend/api/routes/whatWeDoRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/whatWeDoController");
const {
  createSchema,
  updateSchema,
  reorderSchema,
  validate,
} = require("../../validations/whatWeDoValidation");
const upload = require("../../middlewares/upload");

/* ---------------- PUBLIC ---------------- */
router.get("/public", controller.listPublic);

/* ---------------- ADMIN ----------------- */
// If you have auth middleware: const auth = require("../../middlewares/auth");
// router.use(auth);

router.get("/", controller.list);
router.post("/reorder", validate(reorderSchema), controller.reorder); // MUST be before /:id
router.get("/:id", controller.getOne);

router.post(
  "/",
  upload.single("image"),
  validate(createSchema),
  controller.create,
);

router.put(
  "/:id",
  upload.single("image"),
  validate(updateSchema),
  controller.update,
);

router.delete("/:id", controller.remove);

module.exports = router;
