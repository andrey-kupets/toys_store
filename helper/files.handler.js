const { promises: fs } = require('fs-extra');
const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
  uploadProductImg: async (itemDir, itemTypeDir, img, itemId) => {
    const { fullFilePath, uploadPath, filesDir } = _filesDirBuilder(itemDir, itemTypeDir, img.name, itemId);

    await fs.mkdir(filesDir, { recursive: true });
    await img.mv(fullFilePath);

    return uploadPath;
  },
};

function _filesDirBuilder(itemDir, itemTypeDir, itemName, itemId) {
  const pathInsideStaticDir = path.join(itemDir, `${itemId}`, itemTypeDir);
  const filesDir = path.join(process.cwd(), 'static', pathInsideStaticDir);
  const fileExtension = itemName.split('.').pop();
  const fileName = `${uuid()}.${fileExtension}`;
  const fullFilePath = path.join(filesDir, fileName);
  const uploadPath = path.join(pathInsideStaticDir, fileName);

  return { fullFilePath, uploadPath, filesDir };
}
