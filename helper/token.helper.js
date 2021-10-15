const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config');

module.exports = () => {
  const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '10m' }); // todo don't forget to return back
  const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return {
    access_token,
    refresh_token
  };
};
