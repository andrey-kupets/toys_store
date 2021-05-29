const { model, Schema } = require('mongoose');

// const productSubScheme = { // 1st way
//   name: { type: String, required: true },
//   quantity: { type: Number, required: true },
// };

const userScheme = new Schema({
  name: { type: String, required: true },
  // phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  // token: { type: String },
  // _products: [productSubScheme], // 1st way
  _products: [{ type: Schema.Types.ObjectId }], // 2nd way
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('name_status').get(function() {
  return `${this.name}: [${this.role}]`;
});

userScheme.virtual('_productsCartTotals', {
  ref: 'Product',
  localField: '_products',
  foreignField: '_id',
  // justOne: true, // тогда попюлейт вернет один объект, а не массив (из одного объекта), если даже тача у юзера - одна
  // options: {
  //     select: 'name'
  // }
});

userScheme
  .pre('find', function() {
    this.populate('_productsCartTotals');
  });

module.exports = model('User', userScheme);
