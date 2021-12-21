const { Product } = require('../model');
// require('../model'); // DEFINITELY! due to model deps

module.exports = {
  findProducts: async (query = {}) => {
    const {
      limit = 9, page = 1, ...filters
    } = query;

    const skip = (page - 1) * limit;
    const keys = Object.keys(filters);
    const filteredObject = {};

    keys.forEach((key) => {
      switch (key) {
        case 'priceGte':
          filteredObject.price = Object.assign({}, filteredObject.price, { $gte: +filters.priceGte });
          break;

        case 'priceLte':
          filteredObject.price = Object.assign({}, filteredObject.price, {
            $lte: +filters.priceLte
              // ? +filters.priceLte
              // : Infinity
          });
          break;

        case 'category':
          const categories = filters.category.split(';');
          filteredObject.category = { $in: categories };
          break;

        case 'name':
          filteredObject.name = { $regex: filters.name, $options: 'i' };
          break;

        default:
          filteredObject[key] = filters[key];
      }
    });

    // return ({ productsPerPage: Product.find(filters).limit(limit).skip(skip), productsTotals: Product.find(filters) });
    const products = await Product.find(filteredObject).limit(+limit).skip(skip);
    const count = await Product.countDocuments(filteredObject);

    return {
      data: products,
      page: +page,
      // limit,
      // count,
      pages: Math.ceil(count / limit)
    };
  },

  findProductByName: (name) => Product.findOne(name),

  findProductById: (productId) => Product.findById(productId),
  // findProductInCart: (filteredArr) => Product.find({ $in: filteredArr }),

  createProduct: (body) => Product.create(body),

  updateProductById: (productId, updatingObj) => Product.findByIdAndUpdate(productId, updatingObj, { new: true }),
};
