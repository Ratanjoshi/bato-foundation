const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const subscriptionPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    email: joi.string().required().label("Email"),
    button_title: joi.string().required().label("Button Title"),
    button_action: joi.string().required().label("Button Action"),
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

const subscriptionPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().optional().label("Title"),
    email: joi.string().optional().label("Email"),
    button_title: joi.string().optional().label("Button Title"),
    button_action: joi.string().optional().label("Button Action"),
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

module.exports = { subscriptionPostValidation, subscriptionPutValidation };
