const { productService } = require('../service');

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      res.status(200).json(await productService.findProducts(req.query));
    } catch (e) {
      res.status(400).json(e.message);
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    const { params: { productId } } = req;

    try {
      res.status(200).json(await productService.findProductById(productId));
    } catch (e) {
      // res.status(400).json(e.message);
      next(e);
    }
  },
};
