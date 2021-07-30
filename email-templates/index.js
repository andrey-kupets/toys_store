const { emailActionsEnum } = require('../constant');

module.exports = {
  [emailActionsEnum.ACCOUNT_BLOCKING]: {
    templateName: 'zzz',
    subject: 'Your account was blocked'
  },
  [emailActionsEnum.ACCOUNT_DELETION]: {
    templateName: 'xxx',
    subject: 'Your account was deleted.'
  },
  [emailActionsEnum.PASSWORD_CHANGING]: {
    templateName: 'yyy',
    subject: 'Your password was changed'
  },
  [emailActionsEnum.REGISTRATION]: {
    templateName: 'registration',
    subject: 'Welcome to our brotherhood.'
  },
};
