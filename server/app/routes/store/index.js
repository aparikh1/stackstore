'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var CakeModel = mongoose.model('Cake');
var StoreModel = mongoose.model('Store');
var Promise = require('bluebird');



router.get('/create', function (req, res, next) {
    console.log("you hit test create");
    CakeModel.create({
        name: "Test Cake",
        type : "Custom"
    }, function(err, cake){
        console.log("Test Cake created", cake);
        res.redirect("/");
    });
});


router.get('/:storeId', function (req, res, next) {
    StoreModel.findById(req.params.storeId).exec().then(function (store) {
        return store;
    }).then(function (store) {
    	CakeModel.find({ storeId: store._id }).exec().then(function (cakes) {
    		res.send(cakes);
    	});
    });
});


router.get('/colors/:storeId', function (req, res, next) {
    StoreModel.findById(req.params.storeId).exec().then(function (store) {
        res.send(store.colorScheme);
    });
});



router.get('/', function (req, res, next) {
    StoreModel.find().exec().then(function (storeArr) {
        res.send(storeArr);
    });
});