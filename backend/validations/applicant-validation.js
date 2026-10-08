const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const { validateRequestBody } = require("../helpers/validator-helper");

const applicantPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    fullName: joi.string().required().label("fullName"),
    email: joi.string().required().label("email"),
    careerId: joi.number().required().label("careerId"),
    mobile_no: joi.string().required().label("mobile_no"),
    cv_path: joi.string().required().label("cv_path"),
  });
  const errors = await validateRequestBody(req, res, joiModel);
  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }
  return next();
};

const applicantPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    status: joi.string().valid("selected", "unselected").optional(),
  });

  const errors = await validateRequestBody(req, res, joiModel);
  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }
  return next();
};

module.exports = {
  applicantPostValidation,
  applicantPutValidation,
};
