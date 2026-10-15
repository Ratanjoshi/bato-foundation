const whatWeDoService = require("../services/whatWeDoService");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const send = (res, result) =>
  responseHelper.sendResponse(
    res,
    result.status,
    result.success,
    result.data,
    result.errors ?? null,
    result.message,
    result.token ?? null,
  );

const create = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.create(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.list(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const listPublic = async (req, res, next) => {
  try {
    const result = await whatWeDoService.listPublic();
    return res.status(result.status).json({
      success: result.success,
      items: result.data,
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.getById(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.update(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.deleteById(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const reorder = async (req, res, next) => {
  try {
    return send(res, await whatWeDoService.reorder(req));
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

module.exports = {
  create,
  list,
  listPublic,
  getById,
  update,
  deleteById,
  reorder,
};
