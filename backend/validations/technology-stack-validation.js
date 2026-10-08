const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const technologyStackPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    technologyIds: joi.array().items(joi.number()).required(),
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

const technologyStackPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().optional().label("Title"),
    technologyIds: joi.array().items(joi.number()).optional(),
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
  technologyStackPostValidation,
  technologyStackPutValidation,
};
