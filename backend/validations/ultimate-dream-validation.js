const Joi = require("joi");
const responseHelper = require("../helpers/response-helper");

const fields = {
  eyebrow: Joi.string().trim().max(80),
  heading: Joi.string().trim().min(5).max(255),
  description: Joi.string().trim().min(10).max(1000),
  button_label: Joi.string().trim().max(60),
  button_href: Joi.string().trim().max(255),
  image_url: Joi.string().trim().max(500),
  image_alt: Joi.string().trim().max(160).allow("", null),
  is_active: Joi.boolean(),
  order: Joi.number().integer(),
};

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
  });

  if (error) {
    return responseHelper.sendResponse(
      res,
      400,
      false,
      null,
      error.details.map(({ message }) => message),
      "Invalid Ultimate Dream input",
      null,
    );
  }

  req.body = value;
  return next();
};

const json = (req, res, next) => {
  if (req.is("application/json")) return next();
  return responseHelper.sendResponse(
    res,
    400,
    false,
    null,
    null,
    "Content-Type must be application/json",
    null,
  );
};

const create = validateBody(
  Joi.object({
    ...fields,
    eyebrow: fields.eyebrow.required(),
    heading: fields.heading.required(),
    description: fields.description.required(),
    button_label: fields.button_label.required(),
    button_href: fields.button_href.required(),
    image_url: fields.image_url.required(),
    image_alt: fields.image_alt.default(""),
    is_active: fields.is_active.default(true),
    order: fields.order.default(0),
  }),
);

const update = validateBody(Joi.object(fields).min(1));

module.exports = { create, update, json };
