const { responseCodesEnum } = require('../constant');
const { passwordHasher, tokenizer } = require('../helper');
const { authService } = require('../service');
const { AUTHORIZATION } = require('../constant/constants');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      await passwordHasher.compare(password, req.user.password);

      const tokens = await authService.createRecord(req.user._id);

      res.status(responseCodesEnum.OK)
        .json({ user: req.user, tokens }); //  done for front
      // .json(messagesEnum.USER_IS_AUTHORIZED);
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { _id, _user_id } = req.tokenInfo;
      const tokens = tokenizer();

      await authService.updateRecordById(_id, { ...tokens, _user_id });

      res.status(responseCodesEnum.OK)
        .json(tokens);
    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      await authService.deleteAccessToken({ access_token });

      res.json(responseCodesEnum.OK);
    } catch (e) {
      next(e);
    }
  },
};
