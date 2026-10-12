"use strict";

const router = require("express").Router();
const controller = require("../controllers/donation-cta.controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const { uploadDonationImage } = require("../../middlewares/upload.middleware");

/* --------------------------- PUBLIC ------------------------------------ */
router.get("/public", controller.getPublic);

/* ---------------------------- AUTH ------------------------------------- */
router.post("/auth/login", controller.login);

/* --------------------------- ADMIN ------------------------------------- */
router.get("/admin", authMiddleware.authentication, controller.getAdmin);
router.put(
  "/admin",
  authMiddleware.authentication,
  uploadDonationImage,
  controller.upsert,
);
router.delete("/admin/:id", authMiddleware.authentication, controller.remove);

module.exports = router;
