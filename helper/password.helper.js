const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (password, hashpassword) => {
    const doPasswordsEqual = await bcrypt.compare(password, hashpassword);

    return doPasswordsEqual;
  }
};
