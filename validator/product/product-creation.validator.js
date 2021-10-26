const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string()
    // .alphanum()
    .min(2)
    .max(100)
    .required(),
  category: Joi.string()
    // .alphanum()
    .min(2)
    .max(30)
    .required(),
  price: Joi.number()
    .required(),
  type: Joi.string()
    // .alphanum()
    .min(2)
    .max(30)
    .required(),
  description: Joi.string()
    // .alphanum()
    // .min(2)
    .max(500),
  img: Joi.string()
    .alphanum()
});
