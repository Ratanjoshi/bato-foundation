"use strict";

const multerInstance = require("../configs/multer");

/**
 * Single file upload middleware for the donation CTA image.
 * Expects field name: "image"
 */
const uploadDonationImage = (req, res, next) => {
  const handler = multerInstance.single("image");
  handler(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

module.exports = { uploadDonationImage };
