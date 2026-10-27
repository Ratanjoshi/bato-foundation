"use strict";

const { validationResult } = require("express-validator");
const directorMessageService = require("../services/directorMessageService");

function handleValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  return null;
}

/**
 * POST /api/directormessage
 */
async function create(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const record = await directorMessageService.createDirectorMessage(req.body);
    return res.status(201).json({
      success: true,
      message: "Director message created successfully",
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/directormessage
 */
async function list(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const activeOnly = req.query.active === "true";

    const result = await directorMessageService.getAllDirectorMessages({
      page,
      limit,
      activeOnly,
    });

    return res.status(200).json({
      success: true,
      message: "Director messages fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/directormessage/active
 */
async function getActive(req, res, next) {
  try {
    const record = await directorMessageService.getActiveDirectorMessage();
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No active director message found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Active director message fetched successfully",
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/directormessage/:id
 */
async function getById(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const record = await directorMessageService.getDirectorMessageById(
      req.params.id,
    );
    return res.status(200).json({
      success: true,
      message: "Director message fetched successfully",
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /api/directormessage/:id
 */
async function update(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const record = await directorMessageService.updateDirectorMessage(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      success: true,
      message: "Director message updated successfully",
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * PATCH /api/directormessage/:id
 */
async function patch(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const record = await directorMessageService.updateDirectorMessage(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      success: true,
      message: "Director message updated successfully",
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/directormessage/:id
 */
async function remove(req, res, next) {
  const errRes = handleValidationErrors(req, res);
  if (errRes) return errRes;

  try {
    const result = await directorMessageService.deleteDirectorMessage(
      req.params.id,
    );
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  list,
  getActive,
  getById,
  update,
  patch,
  remove,
};
