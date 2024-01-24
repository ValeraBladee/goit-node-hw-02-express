const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addContact = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContact,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
