'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Cake = mongoose.model('Cake');

router.get('/:cakeid', function (req, res, next) {

	Cake.findById(req.params.cakeid, function (err, cake) {
		if(err) return next(err);
		res.send(cake);
	});

});


router.get('/', function (req, res, next) {
    
    Cake.find().populate('storeId').exec().then(function (allcakes) {
        res.send(allcakes);
    });

});