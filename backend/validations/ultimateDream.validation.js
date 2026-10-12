const Joi = require("joi");

const base = {
  eyebrow: Joi.string().max(80),
  heading: Joi.string().min(5).max(255),
  description: Joi.string().min(10).max(1000),
  button_label: Joi.string().max(60),
  button_href: Joi.string().max(255),
  image_alt: Joi.string().max(160).allow("", null),
  is_active: Joi.boolean().truthy("true").falsy("false"),
  order: Joi.number().integer(),
};

exports.createUltimateDreamSchema = Joi.object({
  eyebrow: base.eyebrow.required(),
  heading: base.heading.required(),
  description: base.description.required(),
  button_label: base.button_label.required(),
  button_href: base.button_href.required(),
  image_alt: base.image_alt.default(""),
  is_active: base.is_active.default(true),
  order: base.order.default(0),
});

exports.updateUltimateDreamSchema = Joi.object({
  eyebrow: base.eyebrow.optional(),
  heading: base.heading.optional(),
  description: base.description.optional(),
  button_label: base.button_label.optional(),
  button_href: base.button_href.optional(),
  image_alt: base.image_alt.optional(),
  is_active: base.is_active.optional(),
  order: base.order.optional(),
}).min(1); // at least one field
