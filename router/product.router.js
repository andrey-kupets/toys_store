const router = require('express').Router();

const { productController } = require('../controller');

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);

module.exports = router;
