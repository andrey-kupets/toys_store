const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../error');
const { responseCodesEnum } = require('../constant');
const { errorMsg } = require('../error');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (password, hashpassword) => {
    const doPasswordsEqual = await bcrypt.compare(password, hashpassword);

    if (!doPasswordsEqual) {
      throw new ErrorHandler(
        responseCodesEnum.UNAUTHORIZED,
        errorMsg.WRONG_EMAIL_OR_PASSWORD.customCode
      );
    }
  }
};
