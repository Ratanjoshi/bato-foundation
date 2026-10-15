const Joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");
const { validateRequestBody } = require("../helpers/validator-helper");

const points = Joi.array().items(Joi.string().trim().min(1).max(120)).max(10);
const fields = {
  icon: Joi.string().trim().max(64),
  title: Joi.string().trim().min(2).max(120),
  slug: Joi.string().trim().max(140),
  desc: Joi.string().trim().min(5).max(1000),
  points,
  image: Joi.string().trim().allow("").max(255),
  order: Joi.number().integer().min(0),
  isActive: Joi.boolean(),
};

const validate = (schema) => async (req, res, next) => {
  const errors = await validateRequestBody(req, res, schema);
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
  req.body = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).value;
  return next();
};

const whatWeDoPostValidation = validate(
  Joi.object({
    ...fields,
    title: fields.title.required(),
    desc: fields.desc.required(),
  }),
);

const whatWeDoPutValidation = validate(Joi.object(fields).min(1));

const whatWeDoReorderValidation = validate(
  Joi.object({
    orderedIds: Joi.array()
      .items(Joi.number().integer().positive())
      .min(1)
      .required(),
  }),
);

module.exports = {
  whatWeDoPostValidation,
  whatWeDoPutValidation,
  whatWeDoReorderValidation,
};
