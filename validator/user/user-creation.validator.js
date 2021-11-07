const Joi = require('joi');

const { regExpEnum } = require('../../constant');

const cartSubScheme = Joi.array().items(
  Joi.object({
    _id: Joi.string()
      .alphanum()
      .min(24).max(24),
    count: Joi.number()
  })
);

const wishlistSubScheme = Joi.array().items(
  Joi.object({
    _id: Joi.string()
      .alphanum()
      .min(24).max(24),
  })
);

module.exports = Joi.object({
  name: Joi.string()
    // .alphanum() // can't use non-english
    .min(2).max(30)
    .required(),
  phone: Joi.string().regex(regExpEnum.MOBILE_REGEXP),
  email: Joi.string().regex(regExpEnum.EMAIL_REGEXP).required(),
  password: Joi.string().regex(regExpEnum.PASSWORD_REGEXP).required(),
  role: Joi.string().default('customer'),
  status: Joi.string().default('non-activated'),
  _cart: cartSubScheme,
  _wishlist: wishlistSubScheme,
});
