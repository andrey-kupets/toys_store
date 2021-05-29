const router = require('express').Router();

const { userController } = require('../controller');

router.route('/')
  .get(userController.getUsers);

module.exports = router;
