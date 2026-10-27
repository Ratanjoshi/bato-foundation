"use strict";

const Joi = require("joi");
const responseHelper = require("../helpers/response-helper");

const fields = {
  badgeLabel: Joi.string().trim().min(1).max(100),
  headingLead: Joi.string().trim().min(1).max(100),
  headingAccent: Joi.string().trim().min(1).max(100),
  // ✅ Simply accept any string for imageUrl.
  // This avoids the strict .uri() check that fails on local paths like /uploads/xyz.jpg
  imageUrl: Joi.string().trim().allow("", null),
  imageAlt: Joi.string().trim().min(1).max(200),
  locationLabel: Joi.string().trim().min(1).max(50),
  locationValue: Joi.string().trim().min(1).max(100),
  introParagraph: Joi.string().allow("").max(10000),
  secondaryParagraph: Joi.string().allow("").max(10000),
  quoteText: Joi.string().min(1).max(1000),
  noteIndex: Joi.string().trim().max(10),
  noteLabel: Joi.string().trim().max(50),
  noteTitle: Joi.string().trim().max(150),
  noteParagraph1: Joi.string().allow("").max(10000),
  noteParagraph2: Joi.string().allow("").max(10000),
  noteParagraph3: Joi.string().allow("").max(10000),
  noteFooter: Joi.string().trim().max(100),
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
      "Invalid Formation input",
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

const update = validateBody(Joi.object(fields).min(1));

module.exports = { update, json };
