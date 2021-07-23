const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.route('/')
  .post(
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist,
    userController.registerUser
  )
  .get(userController.getUsers);

router.route('/:userId')
  .get(
    userMiddleware.isUserIdValid,
    userController.getUserById
  )
  .delete(
    authMiddleware.checkAccessToken,
    userMiddleware.isUserIdValid,
    userController.removeUserById
  );

module.exports = router;
