const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.route('/')
  .get(userController.getUsers)
  .post(
    userMiddleware.isUserValid,
    userMiddleware.doesUserAlreadyExist,
    userController.registerUser
  );

// router.route('/:userId')
//   .all(userMiddleware.isUserIdValid)
//   .get(userController.getUserById)
//   .delete(
//     authMiddleware.checkAccessToken,
//     userController.removeUserById
//   )
//   .put(
//     authMiddleware.checkAccessToken,
//     userController.updateUser);

router.use('/:userId', userMiddleware.isUserIdValid);
router.get('/:userId', userController.getUserById);
router.delete('/:userId',
  authMiddleware.checkAccessToken,
  userController.removeUserById);

router.put('/:userId',
  authMiddleware.checkAccessToken,
  userController.updateUser);

module.exports = router;
