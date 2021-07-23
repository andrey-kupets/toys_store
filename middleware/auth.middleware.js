const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = require('../config');
const { constants: { AUTHORIZATION } } = require('../constant');
const { authService } = require('../service');
const { errorHandler } = require('../error');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      //   const access_token = req.get(AUTHORIZATION);
      //
      //   if (!access_token) {
      //     throw new Error('Access token is required');
      //   }
      //
      //   jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
      //     if (err) {
      //       throw new Error('Not valid access_token');
      //     }
      //   });
      //
      //   const tokens = await authService.findTokensByParams({ access_token })
      //     .populate('_user_id'); // 'populate' is passing to the controller value of field-ref!!
      //
      //   if (!tokens) {
      //     throw new Error('No tokens');
      //   }
      //
      //   // console.log(tokens); // output of double populate as [Object] ???
      //
      //   req.user = tokens._user_id; // pass 'user'-field of req to controller farther

      throw new errorHandler('tttt', 418);

      next();
    } catch (e) {
      next(e);
    }
  }
};
