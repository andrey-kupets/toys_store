const { User } = require('../models');
// require('../models'); // DEFINITELY! due to models deps

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
