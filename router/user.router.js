const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.route('/')
  .post(userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.generateUser)
  .get(userController.getUsers);

router.route('/:userId')
  .get(userController.getUserById)
  .delete(authMiddleware.checkAccessToken, userController.removeUserById);

module.exports = router;
