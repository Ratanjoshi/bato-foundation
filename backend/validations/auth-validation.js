const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");
const { validateRequestBody } = require("../helpers/validator-helper");
const { GENDER } = require("../constants/value-constants");

const loginValidation = async (req, res, next) => {
  let joiModel = joi.object({
    username: joi.string().required().label("username"),
    password: joi.string().required().label("password"),
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

const createUserValidation = async (req, res, next) => {
  let joiModel = joi
    .object({
      username: joi.string().required().label("username"),
      firstName: joi.string().optional().label("firstName").allow(null),
      lastName: joi.string().optional().label("lastName").allow(null),
      email: joi.string().required().email(),
      gender: joi
        .string()
        .optional()
        .valid(...GENDER)
        .required()
        .label("gender")
        .allow(null),
      imageUrl: joi
        .string()
        .empty("")
        .default(null)
        .optional()
        .label("imageUrl"),
      password: joi.string().required().label("password"),
      isActive: joi.boolean().optional().label("isActive"),
      mobileNo: joi
        .string()
        .pattern(/^[0-9]{10}$/) // Matches exactly 10 digits
        .optional()
        .allow(null),
      mobilePrefix: joi
        .string()
        .optional()
        .required()
        .label("mobilePrefix")
        .allow(null),
      roleId: joi.number().optional().label("role").allow(null),
      // for future use
      // supervisorId: joi.number().optional().label("supervisorId"),
    })
    .unknown(false);
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

const updateUserValidation = async (req, res, next) => {
  let joiModel = joi
    .object({
      username: joi.string().required().label("username"),
      firstName: joi.string().optional().label("firstName").allow(null),
      lastName: joi.string().optional().label("lastName").allow(null),
      email: joi.string().required().email(),
      gender: joi
        .string()
        .optional()
        .valid(...GENDER)
        .required()
        .label("gender")
        .allow(null),
      imageUrl: joi
        .string()
        .empty("")
        .default(null)
        .optional()
        .label("imageUrl"),
      isActive: joi.boolean().optional().label("isActive"),
      mobileNo: joi
        .string()
        .pattern(/^[0-9]{10}$/) // Matches exactly 10 digits
        .optional()
        .allow(null),
      mobilePrefix: joi
        .string()
        .optional()
        .required()
        .label("mobilePrefix")
        .allow(null),
      roleId: joi.number().optional().label("role").allow(null),
      // for future use
      // supervisorId: joi.number().optional().label("supervisorId"),
    })
    .unknown(false);

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

const updatePublicUserValidation = async (req, res, next) => {
  let joiModel = joi
    .object({
      username: joi.string().optional().label("username"),
      firstName: joi.string().optional().label("firstName"),
      lastName: joi.string().optional().label("lastName"),
      email: joi.string().optional().email().label("email"),
      gender: joi
        .string()
        .valid(...GENDER)
        .optional()
        .label("gender"),
      imageUrl: joi.string().optional().label("imageUrl"),
      mobileNo: joi
        .string()
        .pattern(/^[0-9]{10}$/) // Matches exactly 10 digits
        .optional(),
      mobilePrefix: joi.string().optional().label("mobilePrefix"),
      // for future use
      // supervisorId: joi.number().optional().label("supervisorId"),
    })
    .unknown(false);

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

const deleteUserValidation = async (req, res, next) => {
  let joiModel = joi.object({
    isDeleted: joi.boolean().required().label("isDeleted"),
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

const passwordValidation = async (req, res, next) => {
  let joiModel = joi.object({
    newPassword: joi.string().required().label("newPassword"),
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
  loginValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
  passwordValidation,
  updatePublicUserValidation,
};
