const Joi = require('joi');

module.exports = Joi.string()
  .alphanum()
  .min(24)
  .max(24);
