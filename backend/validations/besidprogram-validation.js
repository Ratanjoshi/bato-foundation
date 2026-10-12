const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} = require("../helpers/validator-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

/**
 * Allowed Lucide icons (must match frontend ICON_MAP)
 */
const ALLOWED_ICONS = [
  "FlaskConical",
  "Lightbulb",
  "Wrench",
  "Share2",
  "Users",
  "BookOpen",
  "Globe",
  "Heart",
  "Target",
  "Sparkles",
  "Zap",
  "Award",
  "Handshake",
  "GraduationCap",
  "Rocket",
];

/* =========================================================
   CREATE
   ========================================================= */
const createBesidesProgramValidation = async (req, res, next) => {
  const joiModel = joi.object({
    icon: joi
      .string()
      .valid(...ALLOWED_ICONS)
      .required()
      .label("icon"),
    title: joi.string().min(1).max(100).required().label("title"),
    description: joi.string().min(1).max(300).required().label("description"),
    order: joi.number().integer().min(0).optional().label("order"),
    isPublished: joi.boolean().optional().label("isPublished"),
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

/* =========================================================
   UPDATE
   ========================================================= */
const updateBesidesProgramValidation = async (req, res, next) => {
  // Validate :id param first
  const paramModel = joi.object({
    id: joi.number().required().label("id"),
  });
  const paramErrors = await validateRequestParams(req, res, paramModel);
  if (!isEmpty(paramErrors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      paramErrors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }

  // Then validate body (all optional)
  const bodyModel = joi.object({
    icon: joi
      .string()
      .valid(...ALLOWED_ICONS)
      .optional()
      .label("icon"),
    title: joi.string().min(1).max(100).optional().label("title"),
    description: joi.string().min(1).max(300).optional().label("description"),
    order: joi.number().integer().min(0).optional().label("order"),
    isPublished: joi.boolean().optional().label("isPublished"),
  });

  const bodyErrors = await validateRequestBody(req, res, bodyModel);
  if (!isEmpty(bodyErrors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      bodyErrors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }
  return next();
};

/* =========================================================
   LIST
   ========================================================= */
const listBesidesProgramValidation = async (req, res, next) => {
  const joiModel = joi.object({
    page: joi.number().integer().min(1).optional().label("page"),
    limit: joi.number().integer().min(1).max(100).optional().label("limit"),
    search: joi.string().optional().allow("").label("search"),
    isPublished: joi.boolean().optional().label("isPublished"),
  });

  const errors = await validateRequestQuery(req, res, joiModel);
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

/* =========================================================
   REORDER
   ========================================================= */
const reorderBesidesProgramValidation = async (req, res, next) => {
  const joiModel = joi.object({
    items: joi
      .array()
      .min(1)
      .items(
        joi.object({
          id: joi.number().integer().required().label("id"),
          order: joi.number().integer().min(0).required().label("order"),
        }),
      )
      .required()
      .label("items"),
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

/* =========================================================
   EXPORTS
   ========================================================= */
module.exports = {
  createBesidesProgramValidation,
  updateBesidesProgramValidation,
  listBesidesProgramValidation,
  reorderBesidesProgramValidation,
};
