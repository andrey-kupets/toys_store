const { User } = require('../models');

module.exports = {
  findUsers: (q) => User.find(q),
};
