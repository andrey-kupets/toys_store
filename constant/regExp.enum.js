module.exports = {
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  MOBILE_REGEXP: new RegExp(/^((8|\+38)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/),
  PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
};
