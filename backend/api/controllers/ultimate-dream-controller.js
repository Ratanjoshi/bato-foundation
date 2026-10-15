const ultimateDreamService = require("../services/ultimateDream-service");
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

exports.getActive = handle(ultimateDreamService.getActive);
exports.getForAdmin = handle(ultimateDreamService.getForAdmin);
exports.create = handle(ultimateDreamService.create);
exports.update = handle(ultimateDreamService.update);
exports.remove = handle(ultimateDreamService.remove);
