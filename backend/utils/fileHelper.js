"use strict";

const fs = require("fs/promises");
const path = require("path");

const deleteUploadedFile = async (publicPath) => {
  if (!publicPath) return;
  try {
    const normalized = publicPath.replace(/^\/+/, "");
    if (!normalized.startsWith("uploads/")) return;
    await fs.unlink(path.resolve(normalized));
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.warn("Failed to delete file:", publicPath, err.message);
    }
  }
};

module.exports = { deleteUploadedFile };
