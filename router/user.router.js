const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');
const { ADMIN, CUSTOMER, SUPER_ADMIN } = require('../constant/userRoles.enum');
const { actionTokensEnum } = require('../constant');

router.route('/')
  .get(userController.getUsers)
  .post(
    userMiddleware.isUserValid,
    userMiddleware.doesUserAlreadyExist,
    userController.registerUser
  );

router.route('/register/activate')
  .put(
    userMiddleware.checkActionToken(actionTokensEnum.REGISTER_ACTIVATE),
    userController.registerActivate
  );

router.use('/:userId',
  userMiddleware.isUserIdValid,
  userMiddleware.checkUserExistenceByDynamicParams('userId', 'params', '_id'));

router.get('/:userId',
  userController.getUserById);

router.delete('/:userId',
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRoleAccess(ADMIN, CUSTOMER, SUPER_ADMIN),
  userController.removeUserById);

router.put('/:userId',
  authMiddleware.checkAccessToken,
  userController.updateUser);

module.exports = router;
