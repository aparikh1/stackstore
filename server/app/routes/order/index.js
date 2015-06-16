'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Promise = require('bluebird');
var Order = mongoose.model('Order');
var ReviewModel = mongoose.model('Review');
var CakeModel = mongoose.model('Cake');


router.post('/', function (req, res, next) {

	var newOrder = new Order({
		customer: req.user._id,
		storeId: req.body.store,
		total: req.body.total,
		items: req.body.cakes
	});

	newOrder.save(function (err) {
		if (err) return next(err);
		res.send("doneski")
	})

});
