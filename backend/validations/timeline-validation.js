const Joi = require("joi");

const createTimelineSchema = Joi.object({
  year: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().allow(null, "").optional(),
  order: Joi.number().integer().optional(),
  isPublished: Joi.boolean().optional(),
});

const updateTimelineSchema = Joi.object({
  year: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().allow(null, "").optional(),
  order: Joi.number().integer().optional(),
  isPublished: Joi.boolean().optional(),
});

module.exports = { createTimelineSchema, updateTimelineSchema };
