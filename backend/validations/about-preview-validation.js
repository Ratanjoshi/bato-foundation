const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const { validateRequestBody } = require("../helpers/validator-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");

const updateAboutPreviewValidation = async (req, res, next) => {
  const joiModel = joi.object({
    badge: joi.string().min(1).max(100).required().label("badge"),
    title: joi.string().min(1).max(255).required().label("title"),
    paragraph1: joi.string().min(1).required().label("paragraph1"),
    paragraph2: joi.string().min(1).required().label("paragraph2"),
    buttonText: joi.string().min(1).max(100).required().label("buttonText"),
    buttonLink: joi.string().min(1).max(255).required().label("buttonLink"),
    imageAlt: joi.string().min(1).max(255).required().label("imageAlt"),
    floatingTitle: joi
      .string()
      .min(1)
      .max(50)
      .required()
      .label("floatingTitle"),
    floatingText: joi.string().min(1).max(255).required().label("floatingText"),
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

module.exports = {
  updateAboutPreviewValidation,
};
