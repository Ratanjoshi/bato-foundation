const applicantService = require("../services/applicant");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

// public
const applyCareer = async (req, res, next) => {
  try {
    console.log("check", req.body);
    const result = await applicantService.applyCareer(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// admin

const getById = async (req, res, next) => {
  try {
    const result = await applicantService.getById(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
const list = async (req, res, next) => {
  try {
    const result = await applicantService.list(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const result = await applicantService.update(req);
//     return responseHelper.sendResponse(
//       res,
//       result.status,
//       result.success,
//       result.data,
//       result.errors,
//       result.message,
//       result.token,
//     );
//   } catch (err) {
//     logger.error(err);
//     next(err);
//   }
// };
const updateStatus = async (req, res, next) => {
  try {
    const result = await applicantService.updateStatus(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await applicantService.deleteApplicant(req);
    return responseHelper.sendResponse(
      res,
      result.status,
      result.success,
      result.data,
      result.errors,
      result.message,
      result.token,
    );
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

module.exports = { applyCareer, remove, updateStatus, getById, list };
