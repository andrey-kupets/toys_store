const { Product } = require('../models');
require('../models'); // SUPER WORK!!

module.exports = {
  findProducts: (q) => Product.find(q),
};
