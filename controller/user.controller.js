const { emailActionsEnum, messagesEnum, responseCodesEnum } = require('../constant');
const { passwordHasher } = require('../helper');
const { mailService, userService } = require('../service');

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
      res.status(responseCodesEnum.OK)
        .json(await userService.findUserById(userId));
    } catch (e) {
      next(e);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const hashPassword = await passwordHasher.hash(password);

      await userService.createUser({ ...req.body, password: hashPassword });

      // https://myaccount.google.com/lesssecureapps - поставить галочку
      await mailService.sendMail(email, emailActionsEnum.REGISTRATION, { userName: name });

      res.status(responseCodesEnum.CREATED)
        .json(messagesEnum.USER_CREATED);
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
  }
};
