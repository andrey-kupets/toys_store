const { User } = require('../model');
// require('../model'); // DEFINITELY! due to model deps

module.exports = {
  findUsers: (q) => User.find(q),

  // findUsers with aggregate; _products: [{ type: Schema.Types.ObjectId --- ONLY. not Mixed}]
  // if ids in _products duplicate - _productsCartTotals output without duplicated items
  // findUsers: () => User.aggregate([
  //   {
  //     $lookup: {
  //       from: 'products',
  //       localField: '_products',
  //       foreignField: '_id',
  //       as: '_productsCartTotals',
  //     }
  //   },
  // ]),

  findUserById: (userId) => User.findById(userId),
  createUser: (b) => User.create(b),
};
