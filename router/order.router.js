const router = require('express').Router();

const { orderController } = require('../controller');

router.post('/', orderController.makeOrder);

module.exports = router;
