const { messagesEnum, responseCodesEnum } = require('../constant');
const { passwordHasher } = require('../helper');
const { authService } = require('../service');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      await passwordHasher.compare(password, req.user.password);

      const tokens = await authService.createRecord(req.user._id);

      res.status(responseCodesEnum.OK)
        .json(tokens);
        // .json(messagesEnum.USER_IS_AUTHORIZED);
    } catch (e) {
      next(e);
    }
  }
};
