const { passwordHasher } = require('../helper');
const { responseCodesEnum } = require('../constant');
const { errorMsg, ErrorHandler } = require('../error');
const { userService, actionTokenService } = require('../service');
const { mutualValidators, userValidators } = require('../validator');
const { verifyActionToken } = require('../service/jwt.service');
const { AUTHORIZATION } = require('../constant/constants');

module.exports = {
  isUserValid: (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      if (name === '' || email === '' || password === '') { // optional
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
      // req.user = user; // for further token fetching         // TODO

      next();
    } catch (e) {
      next(e);
    }
  },

  doesUserExist: async (req, res, next) => {
    try {
      // 1st way by findOne(e)

      const { email, password } = req.body;
      const user = await userService.findUserByEmail({ email }).select('+password');

      if (email === '' || password === '') { // optional
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.EMPTY.customCode
        );
      }

      if (!user) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.WRONG_EMAIL_OR_PASSWORD.customCode
        );
      }

      const doPasswordsEqual = await passwordHasher.compare(password, user.password);

      if (!doPasswordsEqual) {
        throw new ErrorHandler(
          responseCodesEnum.UNAUTHORIZED,
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

  checkUserRoleAccess: (userRolesArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if (!userRolesArr.length) return next();

      if (!userRolesArr.includes(role)) {
        throw new ErrorHandler(
          responseCodesEnum.FORBIDDEN,
          errorMsg.ACCESS_DENIED.customCode
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  // for possible future using
  checkUserExistenceByDynamicParams: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const userByParams = await userService.findUser({ [dbField]: value });

      if (!userByParams) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.NO_USER.customCode
        );
      }

      req.user = userByParams;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkActionToken: (tokenType) => async (req, res, next) => {
    try {
      const action_token = req.get(AUTHORIZATION);

      if (!action_token) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.ACTION_TOKEN_IS_REQUIRED.customCode
        );
      }

      await verifyActionToken(action_token, tokenType);

      const tokenFromDB = await actionTokenService.findTokensByParams({ token: action_token }).populate('user');

      if (!tokenFromDB) {
        throw new ErrorHandler(
          // FORBIDDEN
          responseCodesEnum.FORBIDDEN,
          errorMsg.ACTION_TOKEN_IS_NOT_VALID.customCode

          // or NOT_FOUND
          // responseCodesEnum.NOT_FOUND,
          // errorMsg.RECORD_NOT_FOUND.customCode
        );
      }

      req.activatedUserInfo = tokenFromDB;

      next();
    } catch (e) {
      next(e);
    }
  },
};
