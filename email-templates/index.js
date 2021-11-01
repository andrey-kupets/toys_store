const { emailActionsEnum } = require('../constant');

module.exports = {
  [emailActionsEnum.ACCOUNT_BLOCKING]: {
    templateName: 'zzz',
    subject: 'Your account was blocked.'
  },
  [emailActionsEnum.ACCOUNT_DELETION]: {
    templateName: 'xxx',
    subject: 'Your account was deleted.'
  },
  [emailActionsEnum.PASSWORD_CHANGING]: {
    templateName: 'yyy',
    subject: 'Your password was changed successfully.'
  },
  [emailActionsEnum.REGISTRATION_ACCEPT]: {
    templateName: 'registration-accept',
    subject: 'You will be registered after link clicking!'
  },
  [emailActionsEnum.REGISTRATION]: {
    templateName: 'registration',
    subject: 'Congratulations with registration!'
  },
};
