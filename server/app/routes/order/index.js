'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Order = mongoose.model('Order');
var Cart = mongoose.model('Cart');



router.post('/', function (req, res, next) {


	var newOrder = new Order({
		customer: req.user._id,
		storeId: req.body.store,
		total: req.body.total,
		items: req.body.cakes
	});

	newOrder.save(function (err) {
		if (err) return next(err);
		Cart.findOne({ userId: req.user.userId }).exec().then(function(cart){
			cart.remove().then(function(){
				res.send("cart deleted after checkout")
			})
		})
	})


});

