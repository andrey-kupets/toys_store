const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config');
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

      const authRecord = await authService.findTokensByParams({ access_token })
        .populate('_user_id'); // 'populate' is passing to the controller value of field-ref!!

      if (!authRecord) {
        throw new ErrorHandler(
          responseCodesEnum.NOT_FOUND,
          errorMsg.RECORD_NOT_FOUND.customCode
        );
      }

      // console.log(tokens); // output of double populate as [Object] ???

      req.user = authRecord._user_id; // pass 'user'-field of req to controller farther

      if (!req.user) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
          errorMsg.UNAUTHORIZED.customCode
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);

      if (!refresh_token) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.REFRESH_TOKEN_IS_REQUIRED.customCode
        );
      }

      jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler(
            responseCodesEnum.UNAUTHORIZED,
            errorMsg.REFRESH_TOKEN_IS_NOT_VALID_VERIFY.customCode
          );
        }
      });

      const authRecord = await authService.findTokensByParams({ refresh_token });

      if (!authRecord) {
        throw new ErrorHandler(
          // FORBIDDEN
          // responseCodesEnum.FORBIDDEN,
          // errorMsg.REFRESH_TOKEN_IS_NOT_VALID.customCode

          // or NOT_FOUND
          responseCodesEnum.NOT_FOUND,
          errorMsg.RECORD_NOT_FOUND.customCode
        );
      }

      req.tokenInfo = authRecord; // pass 'user'-field of req to controller farther

      // if (!req.user) {
      //   throw new ErrorHandler(
      //     responseCodesEnum.UNAUTHORIZED,
      //     errorMsg.UNAUTHORIZED.customCode
      //   );
      // }
      next();
    } catch (e) {
      next(e);
    }
  },
};
