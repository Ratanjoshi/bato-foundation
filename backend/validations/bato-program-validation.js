"use strict";

const Joi = require("joi");
const responseHelper = require("../helpers/response-helper");

const fields = {
  slug: Joi.string()
    .trim()
    .min(1)
    .max(255)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: Joi.string().trim().min(1).max(255),
  category: Joi.string().trim().min(1).max(100),
  status: Joi.string().valid("Ongoing", "Upcoming", "Completed"),
  location: Joi.string().trim().min(1).max(255),
  description: Joi.string().trim().min(1).max(5000),
  longDescription: Joi.string().trim().min(1).max(50000),
  image: Joi.string()
    .trim()
    .max(2048)
    .pattern(/^\/?resources\/.+$/)
    .allow("", null),
  isPublished: Joi.boolean(),
  order: Joi.number().integer().min(0),
};

const report = (res, error) =>
  responseHelper.sendResponse(
    res,
    400,
    false,
    null,
    error.details.map(({ message }) => message),
    "Invalid program input",
    null,
  );

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
  });
  if (error) return report(res, error);
  req.body = value;
  return next();
};

const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
  });
  if (error) return report(res, error);
  req.validatedQuery = value;
  return next();
};

const create = validateBody(
  Joi.object({
    slug: fields.slug.required(),
    title: fields.title.required(),
    category: fields.category.required(),
    status: fields.status.required(),
    location: fields.location.required(),
    description: fields.description.required(),
    longDescription: fields.longDescription.required(),
    image: fields.image,
    isPublished: fields.isPublished.default(false),
    order: fields.order.default(0),
  }),
);

const update = validateBody(Joi.object(fields).min(1));
const publish = validateBody(
  Joi.object({ isPublished: fields.isPublished.required() }),
);
const list = validateQuery(
  Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().max(200).allow(""),
    category: fields.category,
    status: fields.status,
    isPublished: fields.isPublished,
  }),
);
const validateId = (req, res, next) => {
  const { error, value } = Joi.object({
    id: Joi.number().integer().positive().required(),
  }).validate(req.params, { convert: true });
  if (error) return report(res, error);
  req.params.id = value.id;
  return next();
};

const validateSlug = (req, res, next) => {
  const { error, value } = Joi.object({
    slug: fields.slug.required(),
  }).validate(req.params, { convert: true });
  if (error) return report(res, error);
  req.params.slug = value.slug;
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

module.exports = {
  create,
  update,
  publish,
  list,
  validateId,
  validateSlug,
  json,
};
