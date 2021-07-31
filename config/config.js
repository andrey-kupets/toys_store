module.exports = {
  PORT: 5000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET',
  ROOT_EMAIL: process.env.ROOT_EMAIL || 'test.gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'Aqw6666666',
};
