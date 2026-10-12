"use strict";

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const {
  DONATION_CTA_UPLOAD_DIR,
  ALLOWED_IMAGE_MIME,
  MAX_IMAGE_SIZE,
} = require("./constants");

const absDir = path.resolve(DONATION_CTA_UPLOAD_DIR);
if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, absDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = crypto.randomBytes(12).toString("hex");
    cb(null, `donation-cta-${Date.now()}-${unique}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_IMAGE_MIME.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only JPEG, PNG, WEBP or AVIF images are allowed."), false);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_IMAGE_SIZE },
});
