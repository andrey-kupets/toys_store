const { Product } = require('../models');
// require('../models'); // SUPER WORK!!

module.exports = {
  findProducts: (query) => {
    const { priceGte, priceLte, ...filters } = query;
    console.log(query);

    if (priceGte) {
      filters.price = Object.assign({}, filters.price, { $gte: priceGte });
    }

    if (priceLte) {
      filters.price = Object.assign({}, filters.price, { $lte: priceLte });
    }

    return Product.find(filters);
  },
  findProductById: (productId) => Product.findById(productId),
};
