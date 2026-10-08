const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const blogPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Name"),
    image: joi.string().required().label("Image"),
    author: joi.string().required().label("Author"),
    summary: joi.string().required().label("Summary"),
    description: joi.string().required().label("Description"),
    blogCategoryId: joi.number().required().label("Blog Category"),
    meta_description: joi.string().optional().label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .optional()
      .label("Meta Keywords"),
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

const blogPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().optional().label("Name"),
    image: joi.string().optional().label("Image"),
    author: joi.string().optional().label("Author"),
    summary: joi.string().optional().label("Summary"),
    description: joi.string().optional().label("Description"),
    blogCategoryId: joi.number().optional().label("Blog Category"),
    meta_description: joi.string().optional().label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .optional()
      .label("Meta Keywords"),
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
  blogPostValidation,
  blogPutValidation,
};
