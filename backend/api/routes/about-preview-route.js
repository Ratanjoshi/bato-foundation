"use strict";

const router = require("express").Router();

const {
  getAboutPreview,
  updateAboutPreview,
} = require("../controllers/about-preview-controller");

const {
  updateAboutPreviewValidation,
} = require("../../validations/about-preview-validation");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const upload = require("../../configs/multer"); // Import multer config

// Get the current about preview data (for admin form)
router.get("/", authentication, authorization, getAboutPreview);

// Update the about preview data (with image upload)
router.put(
  "/",
  authentication,
  authorization,
  upload.single("image"), // <-- Multer middleware handles the file
  updateAboutPreviewValidation,
  updateAboutPreview,
);

module.exports = router;
