'use strict';
var router = require('express').Router();
module.exports = router;

var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var deepPopulate = require('mongoose-deep-populate');
var UserModel = mongoose.model('User');
var textSearch = require('mongoose-text-search');


router.post('/search', function (req, res, next) {
    UserModel.textSearch('k23burke@gmail.com', function (err, user){
        console.log('USER', user);
        res.send(user);
    });
});

router.put('/:id', function (req, res, next) {
    UserModel.findByIdAndUpdate(req.params.id, {$set: {admin: false}})
        .exec().then(function (user) {
        res.send(user);
    }, function (err) {
        return next(err);
    });
});

router.get('/', function (req, res, next) {
    UserModel.find({admin: true}).exec().then(function (userArr) {
        res.send(userArr);
    }, function (err) {
        return next(err);
    });
});

