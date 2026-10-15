"use strict";

const Joi = require("joi");
const responseHelper = require("../helpers/response-helper");

const fields = {
  badge: Joi.string().trim().min(1).max(100),
  title: Joi.string().trim().min(1).max(255),
  paragraph1: Joi.string().trim().min(1).max(5000),
  paragraph2: Joi.string().trim().min(1).max(5000),
  buttonText: Joi.string().trim().min(1).max(100),
  buttonLink: Joi.string().trim().min(1).max(255),
  imageAlt: Joi.string().trim().min(1).max(255),
  imageUrl: Joi.string().trim().min(1).max(255),
  floatingTitle: Joi.string().trim().min(1).max(50),
  floatingText: Joi.string().trim().min(1).max(255),
  isPublished: Joi.boolean(),
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
      "Invalid About Preview input",
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
    badge: fields.badge.required(),
    title: fields.title.required(),
    paragraph1: fields.paragraph1.required(),
    paragraph2: fields.paragraph2.required(),
    buttonText: fields.buttonText.required(),
    buttonLink: fields.buttonLink.required(),
    imageAlt: fields.imageAlt.required(),
    imageUrl: fields.imageUrl.required(),
    floatingTitle: fields.floatingTitle.required(),
    floatingText: fields.floatingText.required(),
    isPublished: fields.isPublished.default(true),
  }),
);

const update = validateBody(Joi.object(fields).min(1));

module.exports = { create, update, json };
