const { messagesEnum, responseCodesEnum } = require('../constant');
const { orderService } = require('../service');

module.exports = {
  makeOrder: async (req, res, next) => {
    try {
      await orderService.checkout(req.body);

      res.status(responseCodesEnum.CREATED)
        .json(messagesEnum.ORDER_CREATED);
    } catch (e) {
      next(e);
    }
  }
};
