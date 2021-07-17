const { responseCodesEnum } = require('../constant');
const { userValidators } = require('../validator');
const { userService } = require('../service');

module.exports = {
  isUserValid: (req, res, next) => {
    try {
      const { error } = userValidators.userCreationValidator.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
    }
  },

  doesUserExist: async (req, res, next) => {
    try {
      const { body } = req;

      const users = await userService.findUsers(); // in this case name is not allowed to be matched too

      // or we may do it by findOne
      users.forEach((user) => {
        if ((body.name === user.name) || (body.email === user.email) || (body.password === user.password)) {
          throw new Error('User already exists. Some his fields are being used. Please enter another ones');
        }
      });

      next();
    } catch (e) {
      res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
    }
  }
};
