const router = require('express').Router();

router.get('/', (req, res) => {
    res.json('method GET is ready');
})

module.exports = router;
