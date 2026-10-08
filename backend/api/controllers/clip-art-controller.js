const clipArtService = require("../services/clip-art-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const createClipArt = async (req, res, next) => {
  try {
    const clipArt = await clipArtService.create(req);
    return responseHelper.sendResponse(
      res,
      clipArt.status,
      clipArt.success,
      clipArt.data,
      clipArt.errors,
      clipArt.message,
      clipArt.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const clipArt = await clipArtService.getById(req);
    return responseHelper.sendResponse(
      res,
      clipArt?.status,
      clipArt.success,
      clipArt.data,
      clipArt.errors,
      clipArt.message,
      clipArt.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const clipArt = await clipArtService.findAllClipArt(req);
    return responseHelper.sendResponse(
      res,
      clipArt.status,
      clipArt.success,
      clipArt.data,
      clipArt.errors,
      clipArt.message,
      clipArt.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const updatedclipArt = async (req, res, next) => {
  try {
    const clipArt = await clipArtService.update(req);
    return responseHelper.sendResponse(
      res,
      clipArt.status,
      clipArt.success,
      clipArt.data,
      clipArt.errors,
      clipArt.message,
      clipArt.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteclipArt = async (req, res, next) => {
  try {
    const clipArt = await clipArtService.deleteClipArt(req);
    return responseHelper.sendResponse(
      res,
      clipArt.status,
      clipArt.success,
      clipArt.data,
      clipArt.errors,
      clipArt.message,
      clipArt.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

module.exports = {
  createClipArt,
  getById,
  list,
  updatedclipArt,
  deleteclipArt,
};
