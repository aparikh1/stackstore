'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Order = mongoose.model('Order');
var OpenReview = mongoose.model('OpenReview');


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

router.put('/:orderId/complete', function (req, res, next) {
	Order.findByIdAndUpdate(req.params.orderId, {$set: { status: req.body.status }})
		.then(function (order) {
			console.log('USER ID', req.user._id);
			console.log('COMPLETED ORDER', order);

			order.items.forEach( function (item) {
				
				splitItemIntoReviews(item, order.customer);
			});
		});
});


var splitItemIntoReviews = function (item, customerId) {
	//create filling array
	var fillArray = []
	item.layers.forEach(function(layer) {
		var found = false;
		if(fillArray.indexOf(layer.filling) < 0) {
			fillArray.push(layer.filling);
		}
	});
	fillArray.push(item.icing);
	return Promise.promisify(createOpenReviews(fillArray));


	var createOpenReviews = function(array) {
		console.log('ITEM ID ARRAY', array);
		array.forEach(function(item) {
			var nRev = new OpenReview();
			nRev.customer = customerId;
			nRev.itemId = item;
			return nRev.save();
		});
	}
}