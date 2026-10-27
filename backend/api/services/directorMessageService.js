"use strict";

const db = require("../../models");
const { DirectorMessage } = db;

/**
 * Create a new director message
 */
async function createDirectorMessage(payload) {
  return DirectorMessage.create({
    name: payload.name,
    role: payload.role,
    org: payload.org,
    photo: payload.photo || null,
    message: payload.message,
    isActive: payload.isActive !== undefined ? payload.isActive : true,
  });
}

/**
 * Get paginated list of director messages
 */
async function getAllDirectorMessages({
  page = 1,
  limit = 10,
  activeOnly = false,
}) {
  const where = {};
  if (activeOnly) where.isActive = true;

  const offset = (page - 1) * limit;
  const { rows, count } = await DirectorMessage.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    data: rows,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
}

/**
 * Get the active director message (used on the frontend section)
 */
async function getActiveDirectorMessage() {
  return DirectorMessage.findOne({
    where: { isActive: true },
    order: [["updatedAt", "DESC"]],
  });
}

/**
 * Get by ID
 */
async function getDirectorMessageById(id) {
  const record = await DirectorMessage.findByPk(id);
  if (!record) {
    const err = new Error("Director message not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    throw err;
  }
  return record;
}

/**
 * Update by ID
 */
async function updateDirectorMessage(id, payload) {
  const record = await getDirectorMessageById(id);

  const allowed = ["name", "role", "org", "photo", "message", "isActive"];
  allowed.forEach((key) => {
    if (payload[key] !== undefined) {
      record[key] = payload[key];
    }
  });

  await record.save();
  return record;
}

/**
 * Delete by ID
 */
async function deleteDirectorMessage(id) {
  const record = await getDirectorMessageById(id);
  await record.destroy();
  return { message: "Director message deleted successfully" };
}

module.exports = {
  createDirectorMessage,
  getAllDirectorMessages,
  getActiveDirectorMessage,
  getDirectorMessageById,
  updateDirectorMessage,
  deleteDirectorMessage,
};
