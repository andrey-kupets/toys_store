const { User } = require('../model');
// require('../model'); // DEFINITELY! due to model deps

module.exports = {
  findUsers: (query) => User.find(query),

  findUser: (requestBodyField) => User.findOne(requestBodyField), // for dynamic middleware

  findUserById: (userId) => User.findById(userId),

  findUserByEmail: (email) => User.findOne(email),

  createUser: (body) => User.create(body),

  deleteUserById: (userId) => User.findByIdAndDelete(userId),

  updateOneUser: (userId, updatingObj) => User.findByIdAndUpdate(userId, updatingObj)
};
