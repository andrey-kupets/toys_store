const router = require('express').Router();

const { userController } = require('../controller');

router.route('/')
  .post(userController.generateUser)
  .get(userController.getUsers);

module.exports = router;
