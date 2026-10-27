"use strict";

const Joi = require("joi");
const responseHelper = require("../helpers/response-helper");

const fields = {
  name: Joi.string().trim().min(1).max(120).required(),
  role: Joi.string().trim().min(1).max(120).required(),
  // Allowing local paths like /uploads/xyz.jpg, same as your formation validation
  image: Joi.string().trim().allow("", null),
  portfolio: Joi.string().trim().allow("", null),
  order: Joi.number().integer().min(0).default(0),
  published: Joi.boolean().default(true),
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
      "Invalid Leadership input",
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

// Create expects all required fields
const create = validateBody(Joi.object(fields));

// Update expects at least one field to change
const updateFields = { ...fields };
delete updateFields.name; // make optional for update
delete updateFields.role; // make optional for update
const update = validateBody(Joi.object(updateFields).min(1));

module.exports = { create, update, json };
