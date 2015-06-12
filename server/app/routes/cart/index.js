'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var body = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Cart = mongoose.model('Cart');

router.get('/:id', function (req, res, next) {

    Cart.find({ user : req.params.id }, function (err, cart) {
        if(err) next(err);
        res.send(cart);
    });

});


router.post('/add', function (req, res, next) {

    var user = req.body.user.data.user._id;
    var cart = req.body.cart.map(function (cake) {
        return cake._id
    });

    var newUserCart = new Cart({ user : user, cakes : cart });

    newUserCart.save(function (err) {
        if(err) next(err);
        res.send("doneski");
    });

});

router.put('/update', function (req, res, next) {

    var user = req.body.user._id;
    var cart;

    console.log("cake being added to database (should have mongo id)",req.body.cart.data._id)

    Cart.findOne({ user : user }).exec().then(function (userCart) {

        // console.log("empty cart",userCart)

        if (_.isArray(req.body.cart)) {

            cart = req.body.cart.map(function (cake) {
                return cake._id;
            });

            cart.forEach(function (cake) {
                userCart.cakes.addToSet(cake);
            });

        } else {

            
            userCart.cakes.addToSet(req.body.cart.data._id);

        }

        return userCart.save();
        

    }, next);

});


router.delete('/:id', function (req, res, next) {

    var cake = req.params.id;
    console.log('CAKE ID', cake);

    Cart.findOne({ user : req.user._id }).exec().then(function (userCart) {
        
        userCart.cakes.remove(cake);
        return userCart.save();

    }, next);



});
