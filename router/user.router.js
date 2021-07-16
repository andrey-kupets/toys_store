const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.route('/')
  .post(userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.generateUser)
  .get(userController.getUsers);

router.route('/:userId')
  .get(userController.getUserById);

module.exports = router;
