"use strict";

const { body, param, query } = require("express-validator");

const createDirectorMessageValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Name must be between 2 and 150 characters"),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Role must be between 2 and 150 characters"),
  body("org")
    .trim()
    .notEmpty()
    .withMessage("Organization is required")
    .isLength({ max: 150 })
    .withMessage("Organization must be at most 150 characters"),
  body("photo")
    .optional({ nullable: true })
    .isString()
    .withMessage("Photo must be a string URL"),
  body("message")
    .isArray({ min: 1 })
    .withMessage("Message must be a non-empty array of paragraphs"),
  body("message.*")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each paragraph must be a non-empty string"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

const updateDirectorMessageValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Valid director message ID is required"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Name must be between 2 and 150 characters"),
  body("role")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Role must be between 2 and 150 characters"),
  body("org")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Organization must be at most 150 characters"),
  body("photo")
    .optional({ nullable: true })
    .isString()
    .withMessage("Photo must be a string URL"),
  body("message")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Message must be a non-empty array of paragraphs"),
  body("message.*")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each paragraph must be a non-empty string"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

const getByIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Valid director message ID is required"),
];

const listValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

module.exports = {
  createDirectorMessageValidation,
  updateDirectorMessageValidation,
  getByIdValidation,
  listValidation,
};
