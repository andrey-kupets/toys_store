const { User } = require('../models');
// require('../models'); // DEFINITELY! due to models deps

module.exports = {
  findUsers: (q) => User.find(q),
  findUserById: (userId) => User.findById(userId),
  createUser: (b) => User.create(b),
};
