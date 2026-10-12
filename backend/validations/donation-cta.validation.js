"use strict";

const Joi = require("joi"); // assumes you already use Joi; if not, swap for your validator

const upsertDonationCtaSchema = Joi.object({
  eyebrow: Joi.string().max(40).allow("", null),
  heading: Joi.string().max(140).required(),
  description: Joi.string().max(500).required(),
  primaryLabel: Joi.string().max(60).allow("", null),
  primaryHref: Joi.string().max(200).allow("", null),
  secondaryLabel: Joi.string().max(60).allow("", null),
  secondaryHref: Joi.string().max(200).allow("", null),
  imageAlt: Joi.string().max(160).allow("", null),
  isActive: Joi.boolean().truthy("true").falsy("false"),
});

module.exports = { upsertDonationCtaSchema };
