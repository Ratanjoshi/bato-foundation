"use strict";

const fs = require("fs/promises");
const path = require("path");

const fileHelper = {};

/**
 * Delete a file stored under /uploads given its public URL path.
 * e.g. "/uploads/donation-cta/foo.webp"
 *
 * Silently ignores missing files. Refuses to delete anything
 * outside the /uploads directory (path traversal guard).
 */
fileHelper.deleteUploadedFile = async (publicPath) => {
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

module.exports = fileHelper;
