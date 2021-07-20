const { model, Schema } = require('mongoose');
const { dbCollectionsEnum: { O_AUTH, USER } } = require('../constant');

const o_AuthScheme = new Schema({
  access_token: { type: String },
  refresh_token: { type: String },
  _user_id: { type: Schema.Types.ObjectId, ref: USER },
}, { timestamps: true });

module.exports = model(O_AUTH, o_AuthScheme);
