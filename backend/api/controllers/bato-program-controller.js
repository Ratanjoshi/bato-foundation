"use strict";

const service = require("../services/bato-program-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const handle = (method) => async (req, res, next) => {
  try {
    const result = await method(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") error.status = 409;
    logger.error(error);
    return next(error);
  }
};

const listPublic = handle((req) => service.list(req, true));

module.exports = {
  listPublic,
  listAdmin: handle(service.list),
  getById: handle(service.getById),
  getPublishedBySlug: handle(service.getPublishedBySlug),
  create: handle(service.create),
  update: handle(service.update),
  publish: handle(service.update),
  remove: handle(service.deleteById),
};
