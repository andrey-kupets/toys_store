const {
  emailActionsEnum,
  messagesEnum,
  responseCodesEnum,
  actionTokensEnum
} = require('../constant');
const { passwordHasher } = require('../helper');
const {
  mailService,
  userService,
  jwtService,
  actionTokenService
} = require('../service');
const { FRONT_URL } = require('../config');
const { ActionToken } = require('../model');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers(req.query);

      res.status(responseCodesEnum.OK)
        .json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    const { params: { userId } } = req;

    try {
      const user = await userService.findUserById(userId);

      res.status(responseCodesEnum.OK)
        .json(user);
    } catch (e) {
      next(e);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const hashPassword = await passwordHasher.hash(password);

      const user = await userService.createUser({ ...req.body, password: hashPassword });

      const actionToken = jwtService.generateActionToken(actionTokensEnum.REGISTER_ACTIVATE);

      await ActionToken.create({ token: actionToken, user: user._id });

      // https://myaccount.google.com/lesssecureapps - поставить галочку
      await mailService.sendMail(
        email,
        emailActionsEnum.REGISTRATION,
        { name, frontUrl: `${FRONT_URL}/register/activate?token=${actionToken}` }
      );

      res.status(responseCodesEnum.CREATED)
        // .json(messagesEnum.USER_CREATED);
        .json({ user });
    } catch (e) {
      next(e);
    }
  },

  registerActivate: async (req, res, next) => {
    try {
      const { activatedUserInfo: { token, user } } = req;

      await userService.updateOneUser(user._id, { status: 'activated' });
      await actionTokenService.deleteActionToken({ token });

      res.status(responseCodesEnum.OK)
        .json(messagesEnum.USER_ACTIVATED);
    } catch (e) {
      next(e);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { prefLang = 'ua' } = req.body;

      // const user = await userService.findUserById(userId); // middleware pass instead of one more request

      // if (userId !== req.user._id.toString()) { // _id --- is not quite a string
      // don't need to check it. because of 'isUserIdValid' middleware is used before

      await userService.deleteUserById(userId);

      res.json(messagesEnum.USER_DELETED[prefLang])
        .status(responseCodesEnum.NO_CONTENT);
      next();
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { params: { userId }, body } = req;

      const updatedUser = await userService.updateOneUser(userId, body);

      res.status(responseCodesEnum.OK)
        // .json(messagesEnum.USER_UPDATED);
        .json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
};
