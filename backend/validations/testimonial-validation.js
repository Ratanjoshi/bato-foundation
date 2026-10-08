const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const testimonialPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    name: joi.string().required().label("Name"),
    description: joi.string().required().label("Description"),
    designation: joi.string().required().label("Designation"),
    image: joi.string().required().label("Image"),
    portfolioId: joi.number().required().label("Portfolio is required"),
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

const testimonialPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    name: joi.string().optional().label("Name"),
    description: joi.string().optional().label("Description"),
    designation: joi.string().optional().label("Designation"),
    image: joi.string().optional().label("Image"),
    portfolioId: joi.number().required().label("Portfolio is required"),
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
  testimonialPostValidation,
  testimonialPutValidation,
};
