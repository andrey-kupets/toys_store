module.exports = {
  checkAccessToken: (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        throw new Error('Access token is required');
      }

      console.log(access_token);

      next();
    } catch (e) {
      next(e);
    }
  }
};
