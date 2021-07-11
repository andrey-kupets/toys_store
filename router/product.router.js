const router = require('express').Router();

const { productController } = require('../controller');

router.get('/', productController.getProductsPerPage);
router.get('/totals', productController.getProductsTotals);

router.get('/:productId', productController.getProductById);

module.exports = router;
