const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(12).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
}).messages({
  'any.required': 'All fields must be filled',
});

const registerAdminSchema = Joi.object({
  name: Joi.string().min(12).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  role: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
});

module.exports = { registerSchema, registerAdminSchema };
