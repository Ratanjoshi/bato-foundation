const qnaService = require("../services/qna-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const create = async (req, res, next) => {
  try {
    const qna = await qnaService.create(req);
    return responseHelper.sendResponse(
      res,
      qna.status,
      qna.success,
      qna.data,
      qna.errors,
      qna.message,
      qna.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const qna = await qnaService.update(req);
    return responseHelper.sendResponse(
      res,
      qna.status,
      qna.success,
      qna.data,
      qna.errors,
      qna.message,
      qna.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

const deleteQna = async (req, res, next) => {
  try {
    const qna = await qnaService.deleteQna(req);
    return responseHelper.sendResponse(
      res,
      qna.status,
      qna.success,
      qna.data,
      qna.errors,
      qna.message,
      qna.token,
    );
  } catch (err) {
    logger.error(err);

    next(err);
  }
};

module.exports = {
  deleteQna,
  create,
  update,
};
