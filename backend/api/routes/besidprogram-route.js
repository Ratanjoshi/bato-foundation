"use strict";

const router = require("express").Router();

// ✅ api/routes/ → ../controllers/
const {
  getPublicBesidesPrograms,
} = require("../controllers/besidprogram-controller");

router.get("/", getPublicBesidesPrograms);

module.exports = router;
