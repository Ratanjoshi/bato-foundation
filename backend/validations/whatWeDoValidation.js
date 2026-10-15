// backend/validations/whatWeDoValidation.js
const Joi = require("joi");

const points = Joi.array().items(Joi.string().trim().min(1).max(120)).max(10);

exports.createSchema = Joi.object({
  icon: Joi.string().trim().max(64),
  title: Joi.string().trim().min(2).max(120).required(),
  slug: Joi.string().trim().max(140),
  desc: Joi.string().trim().min(5).max(1000).required(),
  points: points.default([]),
  image: Joi.string().trim().max(255),
  order: Joi.number().integer().min(0),
  isActive: Joi.boolean(),
});

exports.updateSchema = Joi.object({
  icon: Joi.string().trim().max(64),
  title: Joi.string().trim().min(2).max(120),
  slug: Joi.string().trim().max(140),
  desc: Joi.string().trim().min(5).max(1000),
  points,
  image: Joi.string().trim().max(255),
  order: Joi.number().integer().min(0),
  isActive: Joi.boolean(),
}).min(1);

exports.reorderSchema = Joi.object({
  orderedIds: Joi.array().items(Joi.number().integer()).min(1).required(),
});

// Generic middleware factory
exports.validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      })),
    });
  }
  req.body = value;
  next();
};
