const { userService } = require('../service');
const { passwordHasher } = require('../helper');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      // add to middleware
      const { email, password } = req.body;

      const user = await userService.findUserByEmail({ email });

      if (!user) {
        throw new Error('There is no user with pointed email');
      }

      await passwordHasher.compare(password, user.password);

      res.json('ok, you are authorized');
    } catch (e) {
      next(e);
    }
  }
};
