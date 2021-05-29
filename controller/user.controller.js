const { userService } = require('../service');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      res.status(200).json(await userService.findUsers(req.query));
    } catch (e) {
      next(e);
    }
  },

  generateUser: async (req, res, next) => {
    try {
      await userService.createUser(req.body);
      res.status(201).json('user is created');
    } catch (e) {
      next(e);
    }
  }
};
