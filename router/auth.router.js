const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.post('/', userMiddleware.doesUserExist, authController.authUser);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = router;
