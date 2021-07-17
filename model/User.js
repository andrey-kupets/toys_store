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
  // _productsInCart: [productSubScheme], // 1st way
  _productsInCart: [{ type: Schema.Types.ObjectId }], // 2nd way - ONLY this one fits '.aggregate'
  // _productsInCart: [{ type: Schema.Types.Mixed }], // 3rd way
  _productsInWishlist: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('client_status').get(function() {
  return `${this.name}: [${this.role}]`;
});

userScheme.virtual('_productsCartTotals', {
  ref: 'Product',
  localField: '_productsInCart',
  foreignField: '_id',
  // eslint-disable-next-line max-len
  // justOne: true, // возвращает только один объект (первый по запросу, если объектов несколько), а не массив (пусть даже из одного объекта)
  options: {
    select: 'name price',
    // select: 'name price likes.type',
  }
});

userScheme.virtual('_productsWishlistTotals', {
  ref: 'Product',
  localField: '_productsInWishlist',
  foreignField: '_id',
  options: {
    select: 'name price',
  }
});

userScheme
  .pre('find', function() {
    this.populate('_productsCartTotals');
    this.populate('_productsWishlistTotals');
  });

userScheme
  .pre('findOne', function() {
    this.populate('_productsCartTotals');
    this.populate('_productsWishlistTotals');
  });

module.exports = model('User', userScheme);
