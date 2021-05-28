const router = require('express').Router();

const { authRouter, productRouter, userRouter } = require('.');

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
