const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ "any.required": "Missing 'name' field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing 'email' field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing 'phone' field" }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing 'favorite' field" }),
});

module.exports = {
  contactSchema,
  updateFavoriteSchema,
};
