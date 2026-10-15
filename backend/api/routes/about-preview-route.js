"use strict";

const router = require("express").Router();

const {
  getAboutPreview,
  updateAboutPreview,
  getPublicAboutPreview,
} = require("../controllers/about-preview-controller");

const {
  updateAboutPreviewValidation,
} = require("../../validations/about-preview-validation");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const upload = require("../../configs/multer");

/* PUBLIC */
router.get("/public", getPublicAboutPreview);

/* ADMIN */
router.get("/", authentication, authorization, getAboutPreview);

router.put(
  "/",
  authentication,
  authorization,
  upload.single("image"),
  updateAboutPreviewValidation,
  updateAboutPreview,
);

module.exports = router;
