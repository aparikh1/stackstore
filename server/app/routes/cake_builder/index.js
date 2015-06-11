'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var CakeModel = mongoose.model('Cake');

var IcingModel = mongoose.model('Icing');
var FillingModel = mongoose.model('Filling');
var ShapeModel = mongoose.model('Shape');
var ReviewModel = mongoose.model('Review');



router.get('/', function (req, res, next) {
    
    var getData = function(model){

 	 	return model.find().exec()
    
    }

    Promise.all([getData(FillingModel), getData(IcingModel), getData(ShapeModel), getData(LayerModel), getData(ReviewModel)])
    .spread(function (fillings, icings, shapes, layers, reviews) {
	    // console.log("Fillings", fillings);
	    // console.log("Icings", icings);
	    // console.log("shapes", shapes);
	    // console.log("layers", layers);
	    // console.log("reviews", reviews);
        var ingredients = [fillings, icings, shapes, layers, reviews]
	    res.send(ingredients);
    })
});