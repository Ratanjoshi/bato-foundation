const { UltimateDream } = require("../../models");
const fs = require("fs");
const path = require("path");

/* Resolve the on-disk path for an image_url like "/uploads/ultimate-dream/xxx.jpg" */
function resolveUploadPath(imageUrl) {
  if (!imageUrl) return null;
  // strip leading "/" so path.join treats it as relative
  const relative = imageUrl.replace(/^\/+/, "");
  return path.join(__dirname, "..", "..", relative);
  //                    ↑     ↑    ↑
  //             services   api  backend/
}

/**
 * Public: return the active section for the site.
 */
exports.getActiveUltimateDream = async () => {
  return UltimateDream.findOne({
    where: { is_active: true },
    order: [
      ["order", "ASC"],
      ["created_at", "DESC"],
    ],
  });
};

/**
 * Admin: return the most recent record for the edit form.
 */
exports.getUltimateDreamForAdmin = async () => {
  return UltimateDream.findOne({
    order: [["created_at", "DESC"]],
  });
};

/**
 * Admin: create a new record.
 */
exports.createUltimateDream = async (payload) => {
  const data = { ...payload };

  // Normalize image fields if either 'image' or 'image_url' is provided
  if (data.image && !data.image_url) {
    data.image_url = data.image;
  }
  // Clean up duplicate/temporary keys if needed
  delete data.image;

  return UltimateDream.create(data);
};

/**
 * Admin: update record.
 */
exports.updateUltimateDream = async (id, payload) => {
  const record = await UltimateDream.findByPk(id);
  if (!record) return null;

  const data = { ...payload };

  // Normalize image fields
  if (data.image && !data.image_url) {
    data.image_url = data.image;
  }
  delete data.image;

  // If a new image path is provided and it differs from the old one, clean up old file if it was a local upload
  if (
    data.image_url &&
    data.image_url !== record.image_url &&
    record.image_url &&
    record.image_url.startsWith("/uploads/ultimate-dream/")
  ) {
    const oldPath = resolveUploadPath(record.image_url);
    if (oldPath) fs.promises.unlink(oldPath).catch(() => {});
  }

  await record.update(data);
  return record;
};

/**
 * Admin: delete. Also removes the uploaded file from disk.
 */
exports.deleteUltimateDream = async (id) => {
  const record = await UltimateDream.findByPk(id);
  if (!record) return null;

  if (
    record.image_url &&
    record.image_url.startsWith("/uploads/ultimate-dream/")
  ) {
    const oldPath = resolveUploadPath(record.image_url);
    if (oldPath) fs.promises.unlink(oldPath).catch(() => {});
  }

  await record.destroy();
  return true;
};
