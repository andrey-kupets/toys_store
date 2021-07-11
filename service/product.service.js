const { Product } = require('../models');
// require('../models'); // SUPER WORK!!

module.exports = {
  findProductsPerPage: (query) => {
    const {
      limit = 9, page = 1, priceGte, priceLte, ...filters
    } = query;
    // console.log(query);

    const skip = (page - 1) * limit;

    if (priceGte) {
      filters.price = Object.assign({}, filters.price, { $gte: priceGte });
    }

    if (priceLte) {
      filters.price = Object.assign({}, filters.price, { $lte: priceLte });
    }

    // return ({ productsPerPage: Product.find(filters).limit(limit).skip(skip), productsTotals: Product.find(filters) });
    return Product.find(filters).limit(limit).skip(skip);
  },

  findProductsTotals: () => Product.find(),

  findProductById: (productId) => Product.findById(productId),
};
