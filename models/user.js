const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { uniqueValidateError } = require("../helpers");

const subscriptionsValid = ["starter", "pro", "business"];
const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionsValid,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: { type: String, required: true },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", uniqueValidateError);

const signUpSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().min(8).required(),
});
const verificationSchema = Joi.object({
  email: Joi.string().trim().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsValid)
    .required(),
});

const schemas = {
  signUpSchema,
  verificationSchema,
  loginSchema,
  subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
