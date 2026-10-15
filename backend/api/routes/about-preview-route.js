"use strict";

const router = require("express").Router();

const {
  getAboutPreview,
  createAboutPreview,
  updateAboutPreview,
  getPublicAboutPreview,
} = require("../controllers/about-preview-controller");

const validation = require("../../validations/about-preview-validation");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");

/* PUBLIC */
router.get("/public", getPublicAboutPreview);

/* ADMIN */
router.get("/", authentication, authorization, getAboutPreview);

router.post(
  "/",
  authentication,
  authorization,
  validation.json,
  validation.create,
  createAboutPreview,
);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  validation.json,
  validation.update,
  updateAboutPreview,
);

module.exports = router;
