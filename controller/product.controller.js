const { productService } = require('../service');
const { responseCodesEnum, messagesEnum } = require('../constant');

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const products = await productService.findProducts(req.query);

      res.status(responseCodesEnum.OK).json(products);
    } catch (e) {
      next(e);
    }
  },

  getProductById: async (req, res, next) => {
    const { params: { productId } } = req;

    try {
      const product = await productService.findProductById(productId);

      res.status(responseCodesEnum.OK).json(product);
    } catch (e) {
      next(e);
    }
  },

  setProduct: async (req, res, next) => {
    try {
      await productService.createProduct(req.body);

      res.status(responseCodesEnum.CREATED).json(messagesEnum.PRODUCT_CREATED);
    } catch (e) {
      next(e);
    }
  },
};
