const { responseCodesEnum } = require('../constant');
const { errorMsg, ErrorHandler } = require('../error');
const { userService } = require('../service');
const { mutualValidators, userValidators } = require('../validator');

module.exports = {
  isUserValid: (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      if (name === '' || email === '' || password === '') {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.EMPTY.customCode
        );
      }

      const { error } = userValidators.userCreationValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.JOI_VALIDATION.customCode,
          error.details[0].message // Joi error
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserIdValid: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.findUserById(userId);

      const { error } = mutualValidators.mongoIdValidator.validate(userId);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.JOI_VALIDATION.customCode,
          error.details[0].message
        );
      }

      if (!user) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.INCORRECT_USER.customCode
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  doesUserAlreadyExist: async (req, res, next) => {
    try {
      // 1st way by findOne(e)

      const { email } = req.body;

      const user = await userService.findUserByEmail({ email });

      if (user) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.USER_ALREADY_EXISTS.customCode
        );
      }

      // 2nd way by find()
      //
      // const { body } = req;
      // const users = await userService.findUsers();
      //
      // users.forEach((user) => {
      //   if ((body.email === user.email) || (body.password === user.password)) {
      //     throw new ErrorHandler(
      //       responseCodesEnum.BAD_REQUEST,
      //       errorMsg.USER_EXISTS.customCode
      //     );
      //   }
      // });

      next();
    } catch (e) {
      next(e);
    }
  },

  doesUserExist: async (req, res, next) => {
    try {
      // 1st way by findOne(e)

      const { email, password } = req.body;

      if (email === '' || password === '') {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.EMPTY.customCode
        );
      }

      const user = await userService.findUserByEmail({ email });

      if (!user) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.WRONG_EMAIL_OR_PASSWORD.customCode
        );
      }

      // 2nd way by find()
      //
      // const { body } = req;
      // const users = await userService.findUsers();
      //
      // users.forEach((user) => {
      //   if ((body.email === user.email) || (body.password === user.password)) {
      //     throw new ErrorHandler(
      //       responseCodesEnum.BAD_REQUEST,
      //       errorMsg.USER_EXISTS.customCode
      //     );
      //   }
      // });

      req.user = user; // pass to next()

      next();
    } catch (e) {
      next(e);
    }
  },
};
