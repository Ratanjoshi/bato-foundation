"use strict";

const multer = require("multer");

const notFound = (req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Not Found - ${req.originalUrl}` });
};

const errorHandler = (err, _req, res, _next) => {
  console.error("🔥", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = { notFound, errorHandler };
