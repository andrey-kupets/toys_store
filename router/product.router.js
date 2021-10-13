const router = require('express').Router();

const { productController } = require('../controller');
const { productMiddleware, userMiddleware, authMiddleware } = require('../middleware');
const { ADMIN } = require('../constant/userRoles.enum');

router.route('/')
  .get(productController.getProducts)
  .post(
    productMiddleware.isProductValid,
    productMiddleware.doesProductAlreadyExist,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRoleAccess([ADMIN]),
    productController.setProduct
);

router.get('/:productId', productController.getProductById);

module.exports = router;
