const router = require('express').Router();

const { productController } = require('../controller');
const { productMiddleware, userMiddleware, authMiddleware } = require('../middleware');
const { ADMIN, SUPER_ADMIN } = require('../constant/userRoles.enum');

router.route('/')
  .get(productController.getProducts)
  .post(
    productMiddleware.isProductValid,
    productMiddleware.doesProductAlreadyExist,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRoleAccess([ADMIN, SUPER_ADMIN]),
    productController.setProduct
  );

router.get('/:productId', productController.getProductById);

module.exports = router;
