const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.post(
  '/',
  userMiddleware.doesUserExist,
  authMiddleware.isAuthValid,
  authController.authUser
);

router.post(
  '/refresh',
  authMiddleware.checkRefreshToken,
  authController.refreshToken
);

router.post(
  '/logout',
  authMiddleware.checkAccessToken,
  authController.logoutUser
);

module.exports = router;
