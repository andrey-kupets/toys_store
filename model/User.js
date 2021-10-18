const { model, Schema } = require('mongoose');

const { dbCollectionsEnum: { USER } } = require('../constant');

const cartSubScheme = { // 1st way
  _id: { type: String, required: true },
  count: { type: Number, required: true },
};

const userScheme = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'customer' },
  _cart: [cartSubScheme], // 1st way
  // _cart: [{ type: Schema.Types.ObjectId }], // 2nd way - ONLY this one fits '.aggregate' cause id is ObjectId in Mongo
  // _cart: [{ type: Schema.Types.Mixed }], // 3rd way
  // _cart: [{ type: Object }],
  _wishlist: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('client_status').get(function() {
  return `${this.name}[${this.role}]`;
});

userScheme.virtual('_productsInCart', {
  ref: 'Product',
  localField: '_cart._id', // WORKS JOINING!!!
  foreignField: '_id',
  // justOne: true, // возвращает только один объект (первый по запросу, если объектов несколько),
  // а не массив (пусть даже из одного объекта)
  options: {
    select: 'img name price',
    // select: 'img name price likes.type',
  }
});

userScheme.virtual('_productsInWishlist', {
  ref: 'Product',
  localField: '_wishlist',
  foreignField: '_id',
  options: {
    select: 'img name price',
  }
});

userScheme
  .pre('find', function() {
    this.populate('_productsInCart');
    this.populate('_productsInWishlist');
  });

userScheme
  .pre('findOne', function() {
    this.populate('_productsInCart');
    this.populate('_productsInWishlist');
  });

module.exports = model(USER, userScheme);
