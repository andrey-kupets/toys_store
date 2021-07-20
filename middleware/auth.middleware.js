const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = require('../config');
const { authService } = require('../service');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        throw new Error('Access token is required');
      }

      jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
        if (err) {
          throw new Error('Not valid access_token');
        }
      });

      const tokens = await authService.findTokensByParams({ access_token }).populate('_user_id');

      if (!tokens) {
        throw new Error('No tokens');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
