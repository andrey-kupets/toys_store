const jwt = require('jsonwebtoken');
require('../model');

const { JWT_ACCESS_SECRET } = require('../config');
const { authService } = require('../service');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        throw new Error('Access token is required');
      }

      const tokens = await authService.findTokensByParams({ access_token }).populate('_user_id');

      console.log('**********************');
      console.log(tokens);
      console.log('**********************');

      if (!tokens) {
        throw new Error('No tokens');
      }

      jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
        if (err) {
          throw new Error('Not valid access_token');
        }
      });

      console.log(access_token);

      next();
    } catch (e) {
      next(e);
    }
  }
};
