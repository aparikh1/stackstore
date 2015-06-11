'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var deepPopulate = require('mongoose-deep-populate');
var OrderModel = mongoose.model('Order');

router.get('/', function (req, res, next) {
    OrderModel.find({status: {$inc: ['Created','Processing']}})
        .populate('items').exec().then(function (orderArr) {
        res.send(orderArr);
    }, function (err) {
        return next(err);
    });
});