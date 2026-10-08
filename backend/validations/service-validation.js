const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const servicePostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    img_path: joi.string().required().label("Image path"),
    name: joi.string().required().label("Name"),
    description: joi.string().required().label("Description"),
    // seo_title: joi.string().required().label("SEO Title"),
    // seo_author: joi.string().required().label("SEO Author"),
    seo_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
      .optional()
      .label("SEO Keywords"),
    // seo_og_title: joi.string().required().label("SEO og title"),
    seo_description: joi
      .string()
      .allow(null)
      .optional()
      .label("SEO Description"),
    summary: joi.string().required().label("Summary"),
    useCases: joi
      .array()
      .items(
        joi.object({
          title: joi.string(),
          description: joi.string(),
          img_path: joi.string(),
        }),
      )
      .optional()
      .label("Service use cases"),
    techStack: joi
      .array()
      .items(
        joi.object({
          title: joi.string(),
          choosed: joi.array().items(
            joi.object({
              id: joi.number(),
            }),
          ),
          options: joi.any(),
        }),
      )
      .optional()
      .label("Portfolio techStack"),
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
const servicePutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    img_path: joi.string().required().label("Image path"),
    name: joi.string().required().label("Name"),
    description: joi.string().required().label("Description"),
    // seo_title: joi.string().required().label("SEO Title"),
    // seo_author: joi.string().required().label("SEO Author"),
    seo_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
      .optional()
      .label("SEO Keywords"),
    // seo_og_title: joi.string().required().label("SEO og title"),
    seo_description: joi
      .string()
      .allow(null)
      .optional()
      .label("SEO Description"),
    summary: joi.string().required().label("Summary"),
    useCases: joi
      .array()
      .items(
        joi.object({
          title: joi.string(),
          description: joi.string(),
          img_path: joi.string(),
        }),
      )
      .optional()
      .label("Service use cases"),
    techStack: joi
      .array()
      .items(
        joi.object({
          title: joi.string(),
          choosed: joi.array().items(
            joi.object({
              id: joi.number(),
            }),
          ),
          options: joi.any(),
        }),
      )
      .optional()
      .label("Portfolio techStack"),
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

module.exports = { servicePostValidation, servicePutValidation };
