"use strict";

const aboutPreviewService = require("../services/about-preview-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const sendResponse = (res, result) =>
  responseHelper.sendResponse(
    res,
    result.status,
    result.success,
    result.data,
    result.errors ?? null,
    result.message,
    result.token ?? null,
  );

const handle = (serviceMethod) => async (req, res, next) => {
  try {
    return sendResponse(res, await serviceMethod(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.getPublicAboutPreview = handle(aboutPreviewService.getPublic);
exports.getAboutPreview = handle(aboutPreviewService.getForAdmin);
exports.createAboutPreview = handle(aboutPreviewService.create);
exports.updateAboutPreview = handle(aboutPreviewService.update);
