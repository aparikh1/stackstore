'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');


//icing/
var IcingModel = mongoose.model('Icing');
    router.post('/icing/create', function (req, res, next) {
        console.log(req.body);
        var Icing = new IcingModel(req.body);
        Icing.save(function (err, icing) {
            if(err) next(err);
            console.log('NEW ICING', icing);
            res.send(icing);
        });
    });
    router.post('/icing/:id', function (req, res, next) {
        console.log('UPDATED FIELDS', req.body)
        IcingModel.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: false}, function (err, icing) {
            if(err) next(err);
            console.log('EDITED ICING', icing);
            res.send(icing);
        });
    });
    router.get('/icing/delete/:id', function (req, res, next) {
        IcingModel.find({_id: req.params.id}).remove(function (err, data) {
            console.log('DELETED DATA?', data);
            res.send(data);
        });
    });
    router.get('/icing', function (req, res, next) {
        IcingModel.find({}, function (err, icingArr) {
            if(err) next(err);
            res.send(icingArr);
        })
    });