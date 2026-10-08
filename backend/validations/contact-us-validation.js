const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const contactPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    name: joi.string().required().label("Name"),
    email: joi.string().required().label("Email"),
    message: joi.string().required().label("Message"),
  });

  // Validate the request body using the Joi schema
  const errors = await validateRequestBody(req, res, joiModel);

  // If validation errors exist, respond with an error
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

  // Proceed to the next middleware if validation passes
  return next();
};

const contactPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    name: joi.string().optional().label("Name"),
    email: joi.string().optional().label("Email"),
    message: joi.string().optional().label("Message"),
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

module.exports = { contactPostValidation, contactPutValidation };
