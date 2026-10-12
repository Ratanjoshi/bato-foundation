"use strict";

const router = require("express").Router();
const {
  getPublicAboutPreview,
} = require("../controllers/about-preview-controller");

router.get("/", getPublicAboutPreview);

module.exports = router;
