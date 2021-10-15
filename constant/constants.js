module.exports = {
  AUTHORIZATION: 'Authorization',
  AMAZONAWS: 'amazonaws.com/',

  // FILES MAX_SIZES
  DOC_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB

  // FILES MIMETYPES
  DOCS_MIMETYPES: [
    'application/msword', // DOC
    'application/pdf', // PDF
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS(X)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
  ],

  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ],

  VIDEOS_MIMETYPES: ['video/mpeg', 'video/mp4'],
};
