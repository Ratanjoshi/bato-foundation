const { aboutPreviewModel: AboutPreview } = require("../../models");
const fs = require("fs");
const path = require("path");

// PUBLIC API
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

// ADMIN API - Fetch for editing
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
    return res
      .status(200)
      .json({ title: "Success", message: "OK", data: item });
  } catch (err) {
    next(err);
  }
};

// ADMIN API - Update
exports.updateAboutPreview = async (req, res, next) => {
  try {
    let item = await AboutPreview.findOne({ order: [["id", "DESC"]] });

    // 1. Handle Image Upload
    let newImageUrl = undefined;
    if (req.file) {
      newImageUrl = `/uploads/${req.file.filename}`;
    }

    // 2. If no record exists, create one
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

    // 3. If record exists, update it
    const updateData = { ...req.body };

    if (newImageUrl) {
      updateData.imageUrl = newImageUrl;

      // Delete old image from filesystem if it exists and is a local upload
      if (item.imageUrl && item.imageUrl.startsWith("/uploads/")) {
        const oldImagePath = path.join(__dirname, "../../", item.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old file
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
    // If an error occurs during DB update, delete the newly uploaded file to prevent orphans
    if (req.file) {
      const newFilePath = path.join(
        __dirname,
        "../../uploads",
        req.file.filename,
      );
      if (fs.existsSync(newFilePath)) fs.unlinkSync(newFilePath);
    }
    next(err);
  }
};
