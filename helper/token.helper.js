const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config');

module.exports = () => {
  const access_token = jwt.sign({}, JWT_ACCESS_SECRET, '10m');
  const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, '30d');

  return {
    access_token,
    refresh_token
  };
};