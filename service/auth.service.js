const { O_Auth } = require('../model');
const { tokenizer } = require('../helper');

module.exports = {
  createRecord: (userId) => { // may it async ?
    const tokens = tokenizer();

    O_Auth.create({ _user_id: userId, ...tokens });

    return tokens;
  },

  findTokensByParams: (token) => O_Auth.findOne(token),
  updateRecordById: (id, updatedObj) => O_Auth.findByIdAndUpdate(id, updatedObj),
};
