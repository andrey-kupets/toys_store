const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = require('../config');
const { constants: { AUTHORIZATION } } = require('../constant');
const { authService } = require('../service');
const { responseCodesEnum } = require('../constant');
const { errorMsg, ErrorHandler } = require('../error');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.ACCESS_TOKEN_IS_REQUIRED.customCode
        );
      }

      jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler(
            responseCodesEnum.UNAUTHORIZED,
            errorMsg.ACCESS_TOKEN_IS_NOT_VALID_VERIFY.customCode
          );
        }
      });

      const tokens = await authService.findTokensByParams({ access_token })
        .populate('_user_id'); // 'populate' is passing to the controller value of field-ref!!

      if (!tokens) {
        throw new ErrorHandler(
          responseCodesEnum.FORBIDDEN,
          errorMsg.ACCESS_TOKEN_IS_NOT_VALID.customCode
        );
      }

      // console.log(tokens); // output of double populate as [Object] ???

      req.user = tokens._user_id; // pass 'user'-field of req to controller farther

      next();
    } catch (e) {
      next(e);
    }
  }
};
