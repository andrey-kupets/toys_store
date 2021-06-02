const { model, Schema } = require('mongoose');

const productScheme = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  type: { type: String, required: true },
  img: { type: String },
  totals_count: { type: Number, default: 0 },
  totals_sum: { type: Number, default: 0 },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('Product', productScheme);
