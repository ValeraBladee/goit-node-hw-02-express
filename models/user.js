const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerUserSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

const schemas = {
  registerUserSchema,
  loginUserSchema,
};

module.exports = {
  User,
  schemas,
};
