const jwt = require('jsonwebtoken');

const { JWT_REGISTER_ACTIVATE_SECRET } = require('../config');
const { responseCodesEnum, actionTokensEnum } = require('../constant');
const { errorMsg, ErrorHandler } = require('../error');

module.exports = {
  generateActionToken: (actionType) => {
    const secretWord = _getSecretWordForActionToken(actionType);

    return jwt.sign({}, secretWord, { expiresIn: '7d' });
  },

  verifyActionToken: (token, actionType) => {
    const secretWord = _getSecretWordForActionToken(actionType);

    return jwt.verify(token, secretWord);
  },
};

function _getSecretWordForActionToken(actionType) {
  let secretWord = '';

  switch (actionType) {
    case actionTokensEnum.REGISTER_ACTIVATE:
      secretWord = JWT_REGISTER_ACTIVATE_SECRET;
      break;
    case 'forgot_pass': // for ex. in future
      secretWord = 'forgot_pass_secret';
      break;
    default:
      throw new ErrorHandler(
        responseCodesEnum.INTERNAL_SERVER_ERROR,
        errorMsg.WRONG_TOKEN_TYPE
      );
  }

  return secretWord;
}
