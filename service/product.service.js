const { Product } = require('../models');
// require('../models'); // SUPER WORK!!

module.exports = {
  findProducts: async (query = {}) => {
    const {
      limit = 9, page = 1, ...filters
    } = query;
    // console.log(query);

    const skip = (page - 1) * limit;
    const keys = Object.keys(filters);
    const filteredObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'priceGte':
          filteredObject.price = Object.assign({}, filteredObject.price, { $gte: +filters.priceGte });
          break;
        case 'priceLte':
          filteredObject.price = Object.assign({}, filteredObject.price, { $lte: +filters.priceLte });
          break;
        case 'category':
          const categories = filters.category.split(';');
          filteredObject.category = { $in: categories };
          break;
        // case 'name':
        //   filteredObject.name = { $regex: filters.name, $options: 'i' };
        //   break;
        default:
          filteredObject[key] = filters[key];
      }
    });

    // if (priceGte) {
    //   filters.price = Object.assign({}, filters.price, { $gte: priceGte });
    // }
    //
    // if (priceLte) {
    //   filters.price = Object.assign({}, filters.price, { $lte: priceLte });
    // }

    // return ({ productsPerPage: Product.find(filters).limit(limit).skip(skip), productsTotals: Product.find(filters) });
    const products = await Product.find(filteredObject).limit(+limit).skip(skip);
    const count = await Product.countDocuments(filteredObject);

    console.log(filteredObject);

    return {
      data: products,
      page,
      limit,
      // count,
      pages: Math.ceil(count / limit)
    };
  },

  findProductById: (productId) => Product.findById(productId),
};
