const { O_Auth } = require('../model');
const { tokenizer } = require('../helper');

module.exports = {
  createRecord: (userId) => {
    const tokens = tokenizer();

    O_Auth.create({ _user_id: userId, ...tokens });

    return tokens;
  },

  findTokensByParams: (token) => O_Auth.findOne(token),
  updateRecordById: (id, updatedObj) => O_Auth.findByIdAndUpdate(id, updatedObj),
  deleteAccessToken: (token) => O_Auth.deleteOne(token),
};
