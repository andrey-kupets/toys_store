const { model, Schema } = require('mongoose');

const { dbCollectionsEnum: { ORDER, PRODUCT, USER } } = require('../constant');

const orderSubScheme = {
  _id: { type: String, required: true, ref: PRODUCT },
  count: { type: Number, required: true },
};

const orderScheme = new Schema({
  order: [orderSubScheme],
  status: { type: String, default: 'active' },
  _user_id: { type: Schema.Types.ObjectId, required: true, ref: USER },
}, { timestamps: true });

module.exports = model(ORDER, orderScheme);
