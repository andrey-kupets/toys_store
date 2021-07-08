const { Product } = require('../models');
// require('../models'); // SUPER WORK!!

module.exports = {
  findProducts: (query = {}) => {

    const { lte, gte, ...filters } = query;

    if (!!lte) {
      filters.price = Object.assign({}, filters.price, { $lte: lte });
    }

    if (!!gte) {
      filters.price = Object.assign({}, filters.price, { $gte: gte });
    }

    return Product.find(filters);
  },
  findProductById: (productId) => Product.findById(productId),
};

// db.getCollection('teacher').find({
//   payment: {
//     $gte: 2500             //  >=
//     $gt: 2500              //  >
//     $lte: 2500             //  <=
//     $lt: 2500              //  <
//   }
// })
