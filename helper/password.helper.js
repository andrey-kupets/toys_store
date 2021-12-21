const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: (password, hashpassword) => bcrypt.compare(password, hashpassword) // check for boolean return
};
