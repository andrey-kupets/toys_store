const router = require('express').Router();

const { productController } = require('../controller');

router.route('/')
  .get(productController.getProducts)
  .post(productController.setProduct);

router.get('/:productId', productController.getProductById);

module.exports = router;
