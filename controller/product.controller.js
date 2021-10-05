const { productService } = require('../service');

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productService.findProducts(req.query);

      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    const { params: { productId } } = req;

    try {
      const product = await productService.findProductById(productId);

      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  },
};
