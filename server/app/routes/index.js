'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/store', require('./store'));
router.use('/cake_builder', require('./cake_builder'));
router.use('/cart', require('./cart'));
router.use('/admin', require('./admin'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});