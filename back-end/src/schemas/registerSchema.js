const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(12).required(),
  password: Joi.string().max(6).required(),
  email: Joi.string().email({ tlds: { allow: true } }).required()
}).messages({
  'any.required': 'All fields must be filled'
});

module.exports = registerSchema;