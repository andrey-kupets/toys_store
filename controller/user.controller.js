const { userService } = require('../service');
const { passwordHasher } = require('../helper');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      res.status(200).json(await userService.findUsers(req.query));
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    const { params: { userId } } = req;

    try {
      res.status(200).json(await userService.findUserById(userId));
    } catch (e) {
      next(e);
    }
  },

  generateUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      console.log(req.body, 'from react body');

      const hashPassword = await passwordHasher.hash(password);

      await userService.createUser({ ...req.body, password: hashPassword });
      res.status(201).json('User is created');
    } catch (e) {
      next(e);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      // const user = await userService.findUserById(userId); // middleware pass instead of one more request

      // if (userId !== req.user._id.toString()) { // _id --- is not quite a string
      if (userId !== req.user.id) {
        throw new Error('Unauthorized');
      }

      // todo add to middleware
      if (!req.user) {
        throw new Error("there's no user with pointed id");
      }

      await userService.deleteUserById(userId);

      res.status(200).json('user is deleted');
    } catch (e) {
      // next(e);
      res.json(e.message);
    }
  }
};
