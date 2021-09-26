const { Order } = require('../model');

module.exports = {
  checkout: (b) => Order.create(b),
};
