const { model, Schema } = require('mongoose');
const { dbCollectionsEnum: { O_AUTH } } = require('../constant');

const o_AuthScheme = new Schema({
  access_token: { type: String },
  refresh_token: { type: String },
});

module.exports = model(O_AUTH, o_AuthScheme);
