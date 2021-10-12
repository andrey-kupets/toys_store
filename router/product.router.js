const router = require('express').Router();

const { productController } = require('../controller');
const { productMiddleware } = require('../middleware');

router.route('/')
  .get(productController.getProducts)
  .post(
    productMiddleware.isProductValid,
    productMiddleware.doesProductAlreadyExist,
    productController.setProduct
);

router.get('/:productId', productController.getProductById);

module.exports = router;
