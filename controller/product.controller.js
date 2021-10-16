const { productService } = require('../service');
const {
  filesDirectoriesEnum: { PHOTOS_DIR, PRODUCT_DIR },
  responseCodesEnum,
  messagesEnum
} = require('../constant');
const { filesHandler } = require('../helper');

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
      const { img } = req;

      const product = await productService.createProduct(req.body);

      if (img) {
        const uploadPath = await filesHandler.uploadProductImg(PRODUCT_DIR, PHOTOS_DIR, img, product._id);

        await productService.updateProductById(product._id, { img: uploadPath });
      }

      res.status(responseCodesEnum.CREATED).json(messagesEnum.PRODUCT_CREATED);
    } catch (e) {
      next(e);
    }
  },
};
