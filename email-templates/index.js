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
  [emailActionsEnum.FORGOT_PASS]: {
    templateName: 'qqq',
    subject: 'You can assign a new password now.'
  },
  [emailActionsEnum.PASSWORD_CHANGING]: {
    templateName: 'yyy',
    subject: 'Your password was changed successfully.'
  },
  [emailActionsEnum.REGISTER_ACTIVATE]: {
    templateName: 'register-activate',
    subject: 'Congratulations on your profile activation!'
  },
  [emailActionsEnum.REGISTER]: {
    templateName: 'register',
    subject: 'Congratulations on your register!'
  },
};
