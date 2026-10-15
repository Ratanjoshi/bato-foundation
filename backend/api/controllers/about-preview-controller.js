"use strict";

const { aboutPreviewModel: AboutPreview } = require("../../models");
const fs = require("fs");
const path = require("path");

/* ------------------------------------------------------------------ */
/* PUBLIC — no auth, only returns published row                        */
/* ------------------------------------------------------------------ */
exports.getPublicAboutPreview = async (req, res, next) => {
  try {
    const item = await AboutPreview.findOne({
      where: { isPublished: true },
      order: [["id", "DESC"]],
    });

    if (!item) {
      return res.status(404).json({
        title: "Not Found",
        message: "About preview not found",
        data: null,
      });
    }

    return res.status(200).json({
      title: "Success",
      message: "About preview fetched successfully",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

/* ------------------------------------------------------------------ */
/* ADMIN — fetch for the edit form                                     */
/* ------------------------------------------------------------------ */
exports.getAboutPreview = async (req, res, next) => {
  try {
    const item = await AboutPreview.findOne({ order: [["id", "DESC"]] });

    if (!item) {
      return res.status(404).json({
        title: "Not Found",
        message: "About preview not found",
        data: null,
      });
    }

    return res.status(200).json({
      title: "Success",
      message: "OK",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

/* ------------------------------------------------------------------ */
/* ADMIN — create or update (accepts imageUrl from body OR file)       */
/* ------------------------------------------------------------------ */
exports.updateAboutPreview = async (req, res, next) => {
  try {
    let item = await AboutPreview.findOne({ order: [["id", "DESC"]] });

    /* ---------------- Resolve new image ---------------- */
    // Priority 1: an imageUrl string sent by the media library picker
    let newImageUrl = (req.body.imageUrl || "").trim();

    // Priority 2: a real uploaded file (multer)
    if (!newImageUrl && req.file) {
      newImageUrl = `/uploads/${req.file.filename}`;
    }

    // Normalize: strip any leading slashes so DB is consistent
    // (frontend will prepend the backend origin when rendering)
    if (newImageUrl) {
      newImageUrl = newImageUrl.replace(/^\/+/, "");
    }

    /* ---------------- Create first row ---------------- */
    if (!item) {
      if (!newImageUrl) {
        return res.status(400).json({
          title: "Bad Request",
          message: "Image is required for initial creation",
          data: [],
        });
      }

      const createData = {
        ...req.body,
        imageUrl: newImageUrl,
      };

      item = await AboutPreview.create(createData);

      return res.status(201).json({
        title: "Success",
        message: "About preview created successfully",
        data: item,
      });
    }

    /* ---------------- Update existing row ---------------- */
    const updateData = { ...req.body };

    if (newImageUrl) {
      updateData.imageUrl = newImageUrl;

      // If the old file was a local upload and we're replacing it,
      // delete the old file from disk (best-effort).
      const oldUrl = item.imageUrl || "";
      const isLocalUpload =
        oldUrl.startsWith("/uploads/") || oldUrl.startsWith("uploads/");
      const isDifferentFile =
        oldUrl && oldUrl.replace(/^\/+/, "") !== newImageUrl;

      if (isLocalUpload && isDifferentFile) {
        const oldPath = path.join(
          __dirname,
          "../../",
          oldUrl.replace(/^\/+/, ""),
        );
        try {
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        } catch (e) {
          console.warn(
            "[updateAboutPreview] Could not delete old image:",
            oldPath,
            e.message,
          );
        }
      }
    }

    await item.update(updateData);

    return res.status(200).json({
      title: "Success",
      message: "About preview updated successfully",
      data: item,
    });
  } catch (err) {
    // Cleanup orphan file if multer wrote one but the DB update failed
    if (req.file) {
      const orphan = path.join(__dirname, "../../uploads", req.file.filename);
      try {
        if (fs.existsSync(orphan)) fs.unlinkSync(orphan);
      } catch (_) {}
    }
    next(err);
  }
};
