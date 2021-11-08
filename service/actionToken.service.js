const { ActionToken } = require('../model');

module.exports = {
  findTokensByParams: (token) => ActionToken.findOne(token),
  deleteActionToken: (token) => ActionToken.deleteOne(token),
};
