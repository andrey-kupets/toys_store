const { Product } = require('../models');

module.exports = {
  findProducts: (query) => Product.find(query),
};
