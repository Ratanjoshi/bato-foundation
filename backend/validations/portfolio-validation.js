const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const {
  validateRequestBody,
  validateRequestParams,
} = require("../helpers/validator-helper");

const portfolioPostValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    serviceId: joi.number().required().label("Service Id"),
    product_description: joi.string().required().label("Product Description"),
    core_tech_img: joi
      .array()
      .items(joi.string())
      .optional()
      .label("Image Array"),
    seo_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
      .optional()
      .label("SEO Keywords"),
    seo_description: joi
      .string()
      .allow(null)
      .optional()
      .label("SEO Description"),
    portfolioImages: joi
      .array()
      .items(joi.string())
      .required()
      .label("Portfolio Image is required"),
    projectRequirement: joi
      .object({
        title: joi.string().label("project requirement title"),
        // description: joi.string().label("project description title"),
        requirements: joi
          .array()
          .items(joi.string())
          .label("project requirements"),
      })
      .label("Project Requirement"),
    introduction: joi.string().required().label("Introduction"),
    desktop_view_url: joi.string().required().label("Desktop view url"),
    tablet_view_url: joi
      .string()
      .optional()
      .allow(null)
      .label("Tablet view url"),
    mobile_view_url: joi
      .string()
      .optional()
      .allow(null)
      .label("Mobile view url"),
    portfolioLogo: joi.string().required().label("Portfolio Logo is required"),
    business_challenges: joi.string().required().label("Business Challenges"),
    solutions: joi.string().required().label("Solutions"),
    // portfolio_branding: joi.string().required().label("Portfolio Branding"),
    summary: joi.string().min(10).max(500).optional().label("Summary"),
    imageArray: joi.array().items(joi.string()).optional().label("Image Array"), // Array of string IDs
    subImages: joi
      .array()
      .items(
        joi.object({
          title: joi.string().label("Sub Image Title"),
          svg_string: joi.string().label("SVG String"),
        }),
      )
      .optional()
      .label("Sub Images"),
    projectUrl: joi.string().optional().allow(null).label("Project Url"),
    slug: joi.string().required().label("slug is required"),
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

const portfolioPutValidation = async (req, res, next) => {
  let joiModel = joi.object({
    title: joi.string().required().label("Title"),
    serviceId: joi.number().required().label("Service Id"),
    product_description: joi.string().required().label("Product Description"),
    core_tech_img: joi
      .array()
      .items(joi.string())
      .optional()
      .label("Image Array"),
    portfolioImages: joi
      .array()
      .items(joi.string())
      .required()
      .label("Portfolio Image is required"),
    seo_keywords: joi
      .array()
      .items(joi.string())
      .allow(null)
      .optional()
      .label("SEO Keywords"),
    seo_description: joi
      .string()
      .allow(null)
      .optional()
      .label("SEO Description"),
    projectRequirement: joi
      .object({
        title: joi.string().label("project requirement title"),
        requirements: joi
          .array()
          .items(joi.string())
          .label("project requirements"),
      })
      .label("Project Requirement"),
    introduction: joi.string().required().label("Introduction"),
    desktop_view_url: joi.string().required().label("Desktop view url"),
    tablet_view_url: joi
      .string()
      .optional()
      .allow(null)
      .label("Tablet view url"),
    mobile_view_url: joi
      .string()
      .optional()
      .allow(null)
      .label("Mobile view url"),
    portfolioLogo: joi.string().required().label("Portfolio Logo is required"),
    business_challenges: joi.string().required().label("Business Challenges"),
    solutions: joi.string().required().label("Solutions"),
    // portfolio_branding: joi.string().required().label("Portfolio Branding"),
    summary: joi.string().min(10).max(500).optional().label("Summary"),
    imageArray: joi.array().items(joi.string()).optional().label("Image Array"), // Array of string IDs
    subImages: joi
      .array()
      .items(
        joi.object({
          title: joi.string().label("Sub Image Title"),
          svg_string: joi.string().label("SVG String"),
        }),
      )
      .optional()
      .label("Sub Images"),
    projectUrl: joi.string().optional().allow(null).label("Project Url"),
    slug: joi.string().required().label("slug is required"),
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

module.exports = { portfolioPostValidation, portfolioPutValidation };
