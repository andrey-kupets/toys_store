const { authService, userService } = require('../service');
const { passwordHasher } = require('../helper');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      // todo add to middleware
      const { email, password } = req.body;

      const user = await userService.findUserByEmail({ email });

      if (!user) {
        throw new Error('There is no user with pointed email');
      }

      await passwordHasher.compare(password, user.password);

      const tokens = await authService.createRecord(user._id);

      res.json(tokens);
      res.status(200).json('user is authorized');
    } catch (e) {
      next(e);
      // res.json(e.message);
    }
  }
};
