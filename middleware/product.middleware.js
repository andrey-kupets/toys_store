const { responseCodesEnum } = require('../constant');
const { errorMsg, ErrorHandler } = require('../error');
const { productValidators, mutualValidators } = require('../validator');
const { productService, userService } = require('../service');

module.exports = {
  isProductValid: (req, res, next) => {
    try {
      const {
        name,
        category,
        price,
        type
      } = req.body;

      if (!name || !category || !price || !type) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.EMPTY.customCode
        );
      }

      const { error } = productValidators.productCreationValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.JOI_VALIDATION.customCode,
          error.details[0].message // Joi error
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isProductIdValid: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await productService.findProductById(productId);

      const { error } = mutualValidators.mongoIdValidator.validate(productId);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.JOI_VALIDATION.customCode,
          error.details[0].message
        );
      }

      if (!product) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.INCORRECT_PRODUCT.customCode
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  doesProductAlreadyExist: async (req, res, next) => {
    try {
      const { name } = req.body;
      const product = await productService.findProductByName({ name });

      if (product) {
        throw new ErrorHandler(
          responseCodesEnum.BAD_REQUEST,
          errorMsg.PRODUCT_ALREADY_EXISTS.customCode
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

};
