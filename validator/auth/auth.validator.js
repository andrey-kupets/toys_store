const Joi = require('joi');

const { regExpEnum } = require('../../constant');

module.exports = Joi.object({
  email: Joi.string()
    .regex(regExpEnum.EMAIL_REGEXP)
    .required(),
  password: Joi.string()
    .regex(regExpEnum.PASSWORD_REGEXP)
    .required()
});
