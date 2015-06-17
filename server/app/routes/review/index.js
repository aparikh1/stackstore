'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var CakeModel = mongoose.model('Cake');
var FillingModel = mongoose.model('Filling');
var IcingModel = mongoose.model('Icing');
var StoreModel = mongoose.model('Store');
var ReviewModel = mongoose.model('Review');
var Promise = require('bluebird');



router.put('/', function (req, res, next) {
    console.log('HERE');
    ReviewModel.findByIdAndUpdate(req.body.reviewId, {$set: {shortSummary: req.body.shortSummary, description: req.body.description, stars: req.body.rating, reviewCompleted: true}})
    .exec().then(function (review) {
        console.log('NEW REVIEW', review);
        res.send(review);
    });
});


router.get('/unwritten', function (req, res, next) {
    ReviewModel.find({user: req.user._id, reviewCompleted: false})
        .exec().then(function (reviewArr) {
            console.log('UNWRITTEN', reviewArr);
        res.send(reviewArr);
    });
});


router.get('/:storeId', function (req, res, next) {
    StoreModel.findById(req.params.storeId).exec().then(function (store) {
        return store;
    }).then(function (store) {
    	CakeModel.find({ storeId: store._id }).exec().then(function (cakes) {
    		res.send(cakes);
    	})
    });
});

router.get('/cake/:productId', function (req, res, next) {
    CakeModel.findById(req.params.productId).populate('storeId').exec().then(function (cake) {
        res.send(cake);
    });
});

router.get('/filling/:productId', function (req, res, next) {
    FillingModel.findById(req.params.productId).populate('storeId').exec().then(function (filling) {
        res.send(filling);
    });
});

router.get('/icing/:productId', function (req, res, next) {
    IcingModel.findById(req.params.productId).populate('storeId').exec().then(function (icing) {
        res.send(icing);
    });
});



// router.get('/', function (req, res, next) {
//     StoreModel.find().exec().then(function (storeArr) {
//         res.send(storeArr);
//     });
// });