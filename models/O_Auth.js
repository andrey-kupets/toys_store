const { model, Schema } = require('mongoose');

const o_AuthScheme = new Schema({
  access_token: { type: String },
  refresh_token: { type: String },
});

module.exports = ('O_Auth', o_AuthScheme);
