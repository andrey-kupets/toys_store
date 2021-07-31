const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config');
const templatesInfo = require('../email-templates');
const { errorMsg, ErrorHandler } = require('../error');
const { responseCodesEnum } = require('../constant');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ROOT_EMAIL,
    pass: ROOT_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, action, context) => {
  try {
    const oneTemplateInfo = templatesInfo[action];

    if (!oneTemplateInfo) {
      throw new ErrorHandler(
        responseCodesEnum.BAD_REQUEST,
        errorMsg.INCORRECT_ACTION.customCode
      );
    }

    const html = await templateParser.render(oneTemplateInfo.templateName, context);

    return mailTransporter.sendMail({
      from: 'NowhereMan',
      to: userMail,
      subject: oneTemplateInfo.subject,
      html,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sendMail,
};
