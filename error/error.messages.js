module.exports = {
  // BAD_REQUEST
  BAD_REQUEST: {
    customCode: 4000
  },

  // JOI
  JOI_VALIDATION: {
    customCode: 4001
  },

  // BAD REQUEST - AUTH
  WRONG_EMAIL_OR_PASSWORD: {
    customCode: 4002
  },

  ACCESS_TOKEN_IS_REQUIRED: {
    customCode: 4003
  },

  REFRESH_TOKEN_IS_REQUIRED: {
    customCode: 4004
  },

  // BAD REQUEST - MAIL SERVICE
  INCORRECT_ACTION: {
    customCode: 4005,
    en: 'Incorrect action',
    ua: 'Некоректна дія',
  },

  // BAD REQUEST - USER
  INCORRECT_USER: {
    customCode: 4006
  },

  NO_USER: {
    customCode: 4007
  },

  NO_USERS: {
    customCode: 4008
  },

  USER_ALREADY_EXISTS: {
    customCode: 4009
  },

  // BAD_REQUEST - DOCS
  DOC_IS_TOO_LARGE: {
    customCode: 40010,
    en: 'This doc is too large',
    ua: 'Даний документ занадто великий',
  },

  PHOTO_IS_TOO_LARGE: {
    customCode: 40011,
    en: 'This photo is too large',
    ua: 'Дане фото занадто велике',
  },

  VIDEO_IS_TOO_LARGE: {
    customCode: 40012,
    en: 'This video is too large',
    ua: 'Дане відео занадто велике',
  },

  NOT_VALID_FILE: { // 415 Unsupported Media Type
    customCode: 40013,
    en: 'This file is unknown',
    ua: 'Даний вид файлів є неприпустимим',
  },

  NOT_VALID_PHOTO_TYPE: { // 415 Unsupported Media Type
    customCode: 40014,
    en: 'Not valid photo type',
    ua: 'Неприпустиме фото',
  },

  // BAD REQUEST - MUTUAL
  EMPTY: {
    customCode: 40015
  },

  INVALID_ID: {
    customCode: 40016
  },

  // PRODUCT
  INCORRECT_PRODUCT: {
    customCode: 40017
  },

  PRODUCT_ALREADY_EXISTS: {
    customCode: 40018
  },

  // UNAUTHORIZED - AUTH
  UNAUTHORIZED: {
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

  ACCESS_DENIED: {
    customCode: 4033
  },

  // NOT FOUND
  RECORD_NOT_FOUND: {
    customCode: 4041
  },
};
