const { model, Schema } = require('mongoose');
const { dbCollectionsEnum: { ACTION_TOKEN, USER } } = require('../constant');

const ActionTokenScheme = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  },
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, ActionTokenScheme);
