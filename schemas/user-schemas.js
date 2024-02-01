const Joi = require("joi");
const emailRegexp =
  /^[a-zA-Z][0-9a-zA-Z_]{2,21}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing 'email' field",
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": "The email did not pass the validation check",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing 'password' field",
    "string.empty": `"password" cannot be an empty field`,
    "string.pattern.base": "The password did not pass the validation check",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing 'email' field",
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": "The email did not pass the validation check",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing 'email' field",
    "string.empty": `"email" cannot be an empty field`,
    "string.pattern.base": "Email or password is wrong",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing 'password' field",
    "string.empty": `"password" cannot be an empty field`,
    "string.pattern.base": "Email or password is wrong",
  }),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "Missing 'favorite' field" }),
});

module.exports = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscription,
};
