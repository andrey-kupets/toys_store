const router = require('express').Router();

const { userController } = require('../controller');

router.route('/')
  .post(userController.generateUser)
  .get(userController.getUsers);

router.route('/:userId')
  .get(userController.getUserById);

module.exports = router;
