const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = require('../config');
const { constants: { AUTHORIZATION } } = require('../constant');
const { authService } = require('../service');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        throw new Error('Access token is required');
      }

      jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
        if (err) {
          throw new Error('Not valid access_token');
        }
      });

      const tokens = await authService.findTokensByParams({ access_token })
        .populate('_user_id'); // 'populate' is passing to the controller value of field-ref!!

      if (!tokens) {
        throw new Error('No tokens');
      }

      req.user = tokens._user_id; // pass 'user'-field of req to controller farther

      next();
    } catch (e) {
      next(e);
    }
  }
};
