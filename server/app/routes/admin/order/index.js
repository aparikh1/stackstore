'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var OrderModel = mongoose.model('Order');
var ReviewModel = mongoose.model('Review');

router.get('/', function (req, res, next) {
	// status: {$inc: ['Created','Processing','Completed']} -- 
    OrderModel.find({storeId: req.storeId})
        .populate('items').exec().then(function (orderArr) {
        res.send(orderArr);
    }, function (err) {
        return next(err);
    });
});

router.put('/:orderId/complete', function (req, res, next) {
	OrderModel.findByIdAndUpdate(req.params.orderId, {$set: { status: req.body.status }})
		.populate('items')
		.exec()
		.then(function (order) {
			order.items.forEach( function (item) {
				splitItemIntoReviews(item, order.customer);
			});
		}).then(function () {
			res.send('YAY');
		});
});

var splitItemIntoReviews = function (item, customerId) {
	var createOpenReviews = function(array) {
		array.forEach(function (item, index) {
			var cat;
			var nRev = new ReviewModel();
			nRev.user = customerId;
			if(index == 0) {
				cat = 'cake';
			} else if(index == 1) {
				cat = 'icing';
			} else {
				cat = 'filling';
			}
			nRev.category = cat;
			nRev.productId = item;
			return nRev.save();
		});
	}

		var fillArray = [item._id, item.icing];
		item.layers.forEach(function (layer) {
			if(layer.filling !== null) {
				var exists = false;
				for (var i = 0; i < fillArray.length ; i++) {
					if(layer.filling.toString() === fillArray[i]) {
						fillArray[i]
						exists = true;
					}
				}

				if(!exists) fillArray.push(layer.filling.toString());
			}
		});
		return createOpenReviews(fillArray);
}