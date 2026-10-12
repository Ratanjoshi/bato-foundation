"use strict";

const router = require("express").Router();

// ✅ api/routes/ → ../controllers/ (both are inside api/)
const {
  createBesidesProgram,
  updateBesidesProgram,
  deleteBesidesProgram,
  getBesidesProgram,
  listBesidesProgram,
  togglePublishBesidesProgram,
  reorderBesidesProgram,
} = require("../controllers/besidprogram-controller");

// ✅ api/routes/ → ../../validations/ (up to backend/)
const {
  createBesidesProgramValidation,
  updateBesidesProgramValidation,
  listBesidesProgramValidation,
  reorderBesidesProgramValidation,
} = require("../../validations/besidprogram-validation");

const { idValidation } = require("../../validations/common-validation");

// ✅ api/routes/ → ../../middlewares/ (up to backend/)
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
/* ---------- Static routes first ---------- */

router.get(
  "/list",
  authentication,
  authorization,
  listBesidesProgramValidation,
  listBesidesProgram,
);

router.post(
  "/create",
  authentication,
  authorization,
  createBesidesProgramValidation,
  createBesidesProgram,
);

router.patch(
  "/reorder",
  authentication,
  authorization,
  reorderBesidesProgramValidation,
  reorderBesidesProgram,
);

router.patch(
  "/toggle-publish/:id",
  authentication,
  authorization,
  idValidation,
  togglePublishBesidesProgram,
);

/* ---------- Param routes last ---------- */

router.get(
  "/:id",
  authentication,
  authorization,
  idValidation,
  getBesidesProgram,
);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  updateBesidesProgramValidation,
  updateBesidesProgram,
);

router.delete(
  "/:id",
  authentication,
  authorization,
  idValidation,
  deleteBesidesProgram,
);

module.exports = router;
