const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),
  category: Joi.string()
    .alphanum()
    .required(),
  price: Joi.number()
    .required(),
  type: Joi.string()
    .alphanum()
    .required(),
  description: Joi.string()
    .alphanum(),
  img: Joi.string()
    .alphanum()
});
