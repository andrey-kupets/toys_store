const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.route('/')
  .post(
    userMiddleware.isUserValid,
    userMiddleware.doesUserAlreadyExist,
    userController.registerUser
  )
  .get(userController.getUsers);

// router.route('/:userId')
//   .all(userMiddleware.isUserIdValid)
//   .get(userController.getUserById)
//   .delete(
//     authMiddleware.checkAccessToken,
//     userController.removeUserById
//   );

router.use('/:userId', userMiddleware.isUserIdValid);
router.get('/:userId', userController.getUserById);
router.delete('/:userId',
  authMiddleware.checkAccessToken,
  userController.removeUserById);

module.exports = router;
