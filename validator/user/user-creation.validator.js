const Joi = require('joi');

const { regExpEnum } = require('../../constant');

const productsSubScheme = Joi.array().items(
  Joi.object({ _id: Joi.string().alphanum().min(24).max(24) })
);

module.exports = Joi.object({
  name: Joi.string()
    .alphanum().min(2).max(30)
    .required(),
  // phone: ,
  email: Joi.string().regex(regExpEnum.EMAIL_REGEXP).required(),
  password: Joi.string().regex(regExpEnum.PASSWORD_REGEXP).required(),
  role: Joi.string().default('customer'),
  // _products: Joi.any(),
  _productsInCart: productsSubScheme,
  _productsInWishlist: productsSubScheme,
});
