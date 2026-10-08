const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const pagesPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    // slug: joi.string().required().label("Slug"),
    page_description: joi
      .string()
      .required()
      .min(1)

      .label("Page Description"),
    header_title: joi.string().required().label("Header Title"),
    og_title: joi.string().required().label("OG Title"),
    og_image: joi.string().required().label("OG Image"),
    meta_title: joi.string().required().label("Meta Title"),
    meta_description: joi.string().required().label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .required()
      .label("Meta Keywords"),
    og_description: joi
      .string()
      .required()
      .min(1)
      .max(1000)
      .label("OG Description"),
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

const pagesPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().optional().label("Title"),
    // slug: joi.string().optional().label("Slug"),
    page_description: joi
      .string()
      .optional()
      .min(1)

      .label("Page Description"),
    header_title: joi.string().optional().label("Header Title"),
    og_title: joi.string().optional().label("OG Title"),
    og_image: joi.string().optional().label("OG Image"),
    meta_title: joi.string().optional().label("Meta Title"),
    meta_description: joi.string().optional().label("Meta Description"),
    meta_keywords: joi
      .array()
      .items(joi.string())
      .optional()
      .label("Meta Keywords"),
    og_description: joi
      .string()
      .optional()
      .min(1)
      .max(1000)
      .label("OG Description"),
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
  pagesPostValidation,
  pagesPutValidation,
};
