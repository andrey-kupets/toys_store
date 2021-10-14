const router = require('express').Router();

const {
  authRouter, orderRouter, productRouter, userRouter
} = require('.');

router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
