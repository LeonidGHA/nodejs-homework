const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
});

const putSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
});

module.exports = {
  addSchema,
  putSchema,
};
