const router = require('express').Router();

const { authController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.post('/', userMiddleware.doesUserExist, authController.authUser);

module.exports = router;
