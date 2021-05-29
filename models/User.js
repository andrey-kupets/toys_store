const { model, Schema } = require('mongoose');

const productSubScheme = {
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
};

const userScheme = new Schema({
  name: { type: String, required: true },
  // phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  // token: { type: String },
  _products: [productSubScheme],
});

module.exports = model('User', userScheme);
