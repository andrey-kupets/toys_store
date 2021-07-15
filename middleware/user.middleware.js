const { responseCodesEnum } = require('../constant');
const { userValidators } = require('../validator');

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
};
