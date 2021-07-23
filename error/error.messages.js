module.exports = {
  // BAD_REQUEST
  BAD_REQUEST: {
    customCode: 4000
  },

  // JOI
  JOI_VALIDATION: {
    customCode: 4001
  },

  // AUTH - BAD REQUEST
  WRONG_EMAIL_OR_PASSWORD: {
    customCode: 4002
  },

  ACCESS_TOKEN_IS_REQUIRED: {
    customCode: 4003
  },

  REFRESH_TOKEN_IS_REQUIRED: {
    customCode: 4004
  },

  INCORRECT_ACTION: {
    customCode: 4005,
    en: 'Incorrect action',
    ua: 'Некоректна дія',
  },

  // AUTH -UNAUTHORIZED
  INCORRECT_USER: {
    customCode: 4010
  },

  ACCESS_TOKEN_IS_NOT_VALID: {
    customCode: 4011
  },

  REFRESH_TOKEN_IS_NOT_VALID: {
    customCode: 4012
  },

  // AUTH - FORBIDDEN

  ACCESS_TOKEN_IS_NOT_VALID_VERIFY: {
    customCode: 4031
  },

  REFRESH_TOKEN_IS_NOT_VALID_VERIFY: {
    customCode: 4032
  },

  // MUTUAL

  EMPTY: {
    customCode: 4001

  },

  INVALID_ID: {
    customCode: 4002
  },

  // USER
  TOO_WEAK_PASSWORD: {
    customCode: 4007
  },

  TOO_STRONG_PASSWORD: {
    customCode: 4008
  },

  INVALID_MAIL: {
    customCode: 4009
  },

  NO_USER: {
    customCode: 40010
  },

  NO_USERS: {
    customCode: 40011
  },

  USER_EXISTS: {
    customCode: 40012
  },

  DOC_IS_TOO_LARGE: {
    customCode: 40013,
    en: 'This doc is too large',
    ua: 'Даний документ занадто великий',
  },

  PHOTO_IS_TOO_LARGE: {
    customCode: 40014,
    en: 'This photo is too large',
    ua: 'Дане фото занадто велике',
  },

  VIDEO_IS_TOO_LARGE: {
    customCode: 40015,
    en: 'This video is too large',
    ua: 'Дане відео занадто велике',
  },

  NOT_VALID_FILE: {
    customCode: 40016,
    en: 'This file is unknown',
    ua: 'Даний вид файлів є неприпустимим',
  },

  NOT_VALID_PHOTO_TYPE: {
    customCode: 40017,
    en: 'Not valid photo type',
    ua: 'Неприпустиме фото',
  },
};
