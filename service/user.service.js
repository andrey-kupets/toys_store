const { User } = require('../model');
// require('../model'); // DEFINITELY! due to model deps

module.exports = {
  findUsers: (query) => User.find(query),

  // findUsers with aggregate; _products: [{ type: Schema.Types.ObjectId --- ONLY. not Mixed}]
  // if ids in _products duplicate - _productsCartTotals output without duplicated items
  // findUsers: () => User.aggregate([
  //   {
  //     $lookup: {
  //       from: 'products',
  //       localField: '_cart',
  //       foreignField: '_id',
  //       as: '_productsInCart',
  //     }
  //   },
  // ]),

  findUser: (requestBodyField) => User.findOne(requestBodyField), // for dynamic middleware

  findUserById: (userId) => User.findById(userId),

  findUserByEmail: (email) => User.findOne(email),

  createUser: (body) => User.create(body),

  // deleteUserById: (userId) => User.deleteOne({ _id: userId }),
  deleteUserById: (userId) => User.findByIdAndDelete({ _id: userId }),

  // updateOneUser: (userId, updatingObj) => User.updateOne({ _id: userId }, { $set: updatingObj }),
  // updateOneUser: (userId, updatingObj) => User.findOneAndUpdate({ _id: userId }, updatingObj), // simpler
  updateOneUser: (userId, updatingObj) => User.findByIdAndUpdate(userId, updatingObj) // simplest
};
