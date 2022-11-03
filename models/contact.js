const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = {
  addSchema,
  putSchema,
  updateSchema,
};

const Contact = model("contact", contactShema);

module.exports = { Contact, shemas };
