const { O_Auth } = require('../model');
const { tokenizer } = require('../helper');

module.exports = {
  createRecord: async (userId) => {
    const tokens = tokenizer();

    await O_Auth.create({ _user_id: userId, ...tokens });

    return tokens;
  },

  findTokensByParams: (token) => O_Auth.findOne(token),
};
