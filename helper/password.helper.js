const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: (password, hashpassword) => {
    const doPasswordsEqual = bcrypt.compare(password, hashpassword);

    if (!doPasswordsEqual) {
      throw new Error('Wrong email or password');
    }
  }
};
