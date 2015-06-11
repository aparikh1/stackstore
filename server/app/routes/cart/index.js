'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Cart = mongoose.model('Cart');



router.get('/', function (req, res, next) {
	console.log('test');
    Cart.find({}, function (err, cart) {
        console.log('cart', cart);
        if(err) next(err);
        res.send(cart);
    })
});