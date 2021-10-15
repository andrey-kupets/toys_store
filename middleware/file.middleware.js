const ErrorHandler = require('../error/ErrorHandler');
const { responseCodesEnum } = require('../constant');
const {
  DOC_MAX_SIZE,
  DOCS_MIMETYPES,
  PHOTO_MAX_SIZE,
  PHOTOS_MIMETYPES,
  VIDEO_MAX_SIZE,
  VIDEOS_MIMETYPES
} = require('../constant/constants');
const {
  DOC_IS_TOO_LARGE,
  NOT_VALID_FILE,
  PHOTO_IS_TOO_LARGE,
  VIDEO_IS_TOO_LARGE
} = require('../error/error.messages');

module.exports = {
  checkFile: (req, res, next) => {
    try {
      const { files } = req;
      const docs = [];
      const photos = [];
      const videos = [];

      req.docs = docs;
      req.photos = photos;
      req.videos = videos;

      const allFiles = Object.values(files);

      for (let i = 0; i < allFiles.length; i++) {
        const { size, mimetype } = allFiles[i];

        if (DOCS_MIMETYPES.includes(mimetype)) {
          if (DOC_MAX_SIZE < size) {
            throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, DOC_IS_TOO_LARGE.customCode);
          }

          docs.push(allFiles[i]);
        } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
          if (PHOTO_MAX_SIZE < size) {
            throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, PHOTO_IS_TOO_LARGE.customCode);
          }

          photos.push(allFiles[i]);
        } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
          if (VIDEO_MAX_SIZE < size) {
            throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, VIDEO_IS_TOO_LARGE.customCode);
          }

          videos.push(allFiles[i]);
        } else {
          throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NOT_VALID_FILE.customCode);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
