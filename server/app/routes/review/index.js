'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var CakeModel = mongoose.model('Cake');
var StoreModel = mongoose.model('Store');
var Promise = require('bluebird');



router.post('/', function (req, res, next) {



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
    // var id = req.params.storeId;
    // CakeModel.find({id: id})
    //     .populate('shape','type description')
    //     .populate('icing','name description price')
    //     .populate('filling','name description price')
    //     .populate('reviews').exec(function (err, cakesArr){
    //         if(err) next(err);
    //         console.log('CAKES ARR', cakesArr);
    //         res.send(cakesArr);
    //     });
    // CakeModel.findOne({_id: id}, function (err, cake) {
    //     if(err) next(err);
    //     console.log('THE CAKE', cake);
    //     res.send(cake);
    // });
    // CakeModel.findOne({_id: id}).exec()
    //     .then(function (err, cake) {
    //         if(err) next(err);
    //         console.log('THE CAKE', cake);
    //         res.send(cake);
    //     });
});



router.get('/', function (req, res, next) {
    StoreModel.find().exec().then(function (storeArr) {
        res.send(storeArr);
    });
});