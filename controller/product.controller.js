const { productService, s3Service } = require('../service');
const {
  // filesDirectoriesEnum: { PHOTOS_DIR, PRODUCT_DIR },
  responseCodesEnum,
  // messagesEnum
} = require('../constant');
const { PRODUCT_DIR } = require('../constant/files.directories.enum');
// const { filesHandler } = require('../helper');

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
      const { img } = req.files;

      let createdProduct = await productService.createProduct(req.body);

      // FOR 'STATIC'
      // if (img) {
      //   const uploadPath = await filesHandler.uploadProductImg(PRODUCT_DIR, PHOTOS_DIR, img, product._id);
      //
      //   await productService.updateProductById(product._id, { img: uploadPath });
      // }

      // FOR AWS-BUCKET
      if (req.files && req.files.img) {
        const s3Response = await s3Service.uploadFile(img, PRODUCT_DIR, createdProduct._id); // todo normal id
        createdProduct = await productService.updateProductById(
          createdProduct._id,
          { img: s3Response.Location }
        );
      }

      res.status(responseCodesEnum.CREATED)
        // .json(messagesEnum.PRODUCT_CREATED);
        .json(createdProduct);
    } catch (e) {
      next(e);
    }
  },
};
