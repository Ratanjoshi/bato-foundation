const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const { validateRequestBody } = require("../helpers/validator-helper");

const careerPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("name"),
    no_of_opening: joi.number().required().label("no_of_opening"),
    is_published: joi.boolean().required().label("is_published"),
    location: joi.string().required().label("location"),
    type: joi.string().required().label("type"),
    categoryId: joi.number().required().label("Blog Category"),
    description: joi.string().required().min(10).max(1000).label("description"),
    specification: joi
      .string()
      .required()
      .min(10)
      .max(5000)
      .label("specification"),
    meta_description: joi
      .string()
      .allow(null)
      .optional()
      .label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
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

const careerPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().optional().label("name"),
    no_of_opening: joi.number().optional().label("no_of_opening"),
    is_published: joi.boolean().optional().label("is_published"),
    location: joi.string().optional().label("location"),
    type: joi.string().optional().label("type"),
    categoryId: joi.number().required().label("Blog Category"),
    description: joi.string().optional().min(10).max(1000).label("description"),
    specification: joi
      .string()
      .optional()
      .min(10)
      .max(5000)
      .label("specification"),
    meta_description: joi
      .string()
      .allow(null)
      .optional()
      .label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
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
  careerPostValidation,
  careerPutValidation,
};
