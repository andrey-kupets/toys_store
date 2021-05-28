const router = require('express').Router();

const { productController } = require('../controller');

router.get('/', productController.getProducts);

module.exports = router;
