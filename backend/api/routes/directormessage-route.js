"use strict";

const express = require("express");
const router = express.Router();

// ✅ Correct paths based on your folder structure
const directorMessageController = require("../controllers/directorMessageController");
const {
  createDirectorMessageValidation,
  updateDirectorMessageValidation,
  getByIdValidation,
  listValidation,
} = require("../../validations/directorMessageValidation");

// Public routes
router.get("/", listValidation, directorMessageController.list);

// 🚨 THIS MUST BE ABOVE /:id 🚨
router.get("/active", directorMessageController.getActive);

router.get("/:id", getByIdValidation, directorMessageController.getById);

// Protected (admin) routes
router.post(
  "/",
  createDirectorMessageValidation,
  directorMessageController.create,
);

// Standard update
router.put(
  "/:id",
  updateDirectorMessageValidation,
  directorMessageController.update,
);

// ✅ PATCH update (used by the Admin Panel form)
router.patch(
  "/:id",
  updateDirectorMessageValidation,
  directorMessageController.patch,
);

router.delete("/:id", getByIdValidation, directorMessageController.remove);

module.exports = router;
