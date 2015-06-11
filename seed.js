/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Shape = mongoose.model('Shape');
var Icing = mongoose.model('Icing');
var Filling = mongoose.model('Filling');
var Layer = mongoose.model('Layer');
var Review = mongoose.model('Review');
var Cake = mongoose.model('Cake');
var q = require('q');
var chalk = require('chalk');


// USERS
var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return q.invoke(User, 'create', users);

};


// SHAPES
var getShapesData = function () {
    return q.ninvoke(Shape, 'find', {});
};

var seedShapes = function () {
    var shapes = [{
        name: 'round',
        description: 'round description'
    }, {
        name: 'square',
        description: 'square description'
    }, {
        name: 'rectangle',
        description: 'rectangle description'
    }];

    return q.invoke(Shape, 'create', shapes)
}


// FILLING
var getFillingsData = function () {
    return q.ninvoke(Filling, 'find', {});
};

var seedFilling = function () {

    var fillings = [{
        name: 'chocolate',
        description: 'chocolate description',
        price: 20
    }, {
        name: 'vanilla',
        description: 'vanilla description',
        price: 30
    }, {
        name: 'strawberry',
        description: 'strawberry description',
        price: 40
    }];

    return q.invoke(Filling, 'create', fillings)
}


// ICING
var getIcingsData = function () {
    return q.ninvoke(Icing, 'find', {});
};

var seedIcing = function () {

    var icings = [{
        name: 'chocolate',
        description: 'chocolate description',
        price: 5
    }, {
        name: 'vanilla',
        description: 'vanilla description',
        price: 10
    }, {
        name: 'strawberry',
        description: 'strawberry description',
        price: 15
    }];

    return q.invoke(Icing, 'create', icings)
}


//LAYERS
var getLayersData = function () {
    return q.ninvoke(Layer, 'find', {});
};

var seedLayers = function (fillings) {

    var layers = [
    {
        position: 1,
        filling: fillings[Math.floor(Math.random() * fillings.length)]._id,
    },
    {
        position: 2,
        filling: fillings[Math.floor(Math.random() * fillings.length)]._id,
    },
    {
        position: 3,
        filling: fillings[Math.floor(Math.random() * fillings.length)]._id,
    },
    {
        position: 4,
        filling: fillings[Math.floor(Math.random() * fillings.length)]._id,
    }];

    return q.invoke(Layer, 'create', layers)
}


// CAKE REVIEWS
var getReviewsData = function () {
    return q.ninvoke(Review, 'find', {});
};

var seedReviews = function (users) {

    var reviews = [{
        user: users[Math.floor(Math.random() * users.length)]._id,
        summary: 'top notch cake',
        description: 'description top notch cake',
        stars: 5
    }, {
        user: users[Math.floor(Math.random() * users.length)]._id,
        summary: 'horrib cake',
        description: 'description horrid cake',
        stars: 1
    }, {
        user: users[Math.floor(Math.random() * users.length)]._id,
        summary: 'kickass cake',
        description: 'description kickass cake',
        stars: 4
    }];

    return q.invoke(Review, 'create', reviews)
}



var seedCakes = function (shapes, icings, fillings, reviews, layers) {

    var prices = [30, 40, 50, 60, 70];
    var quantities = [5, 10, 15, 20];

    //query for icings
    var cakes = [
        // no price or quantity defined on first cake
        {
            name: 'Stock Cake 1',
            type: 'stock', // custom or stock
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id
        },
        {
            name: 'Stock Cake 2',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 3',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 4',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 5',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 6',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 7',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 8',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 9',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        },
        {
            name: 'Stock Cake 10',
            type: 'stock', // custom or stock
            price: prices[Math.floor(Math.random() * shapes.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)]._id,
            icing: icings[Math.floor(Math.random() * icings.length)]._id,
            layers: [
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id,
                layers[Math.floor(Math.random() * layers.length)]._id
            ],
            reviews: reviews[Math.floor(Math.random() * reviews.length)]._id,
            quantity: quantities[Math.floor(Math.random() * quantities.length)]
        }

    ];

    return q.invoke(Cake, 'create', cakes);

};



connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }
    }).then(function () {
        return q.ninvoke(User, 'find', {});
    }).then(function (users) {
        return seedReviews(users);
    }).then(function () {
        return q.ninvoke(Shape, 'find', {});
    }).then(function (shapes) {
        if (shapes.length === 0) {
            return seedShapes();
        } else {
            console.log(chalk.magenta('Seems to already be shape data, exiting!'));
        }
    }).then(function () {
        return q.ninvoke(Filling, 'find', {});
    }).then(function (filling) {
        if (filling.length === 0) {
            return seedFilling();
        } else {
            console.log(chalk.magenta('Seems to already be filling data, exiting!'));
        }
    }).then(function () {
        return q.ninvoke(Filling, 'find', {});
    }).then(function (fillings) {
        return seedLayers(fillings);
    }).then(function () {
        return q.ninvoke(Icing, 'find', {});
    }).then(function (icings) {
        if (icings.length === 0) {
            return seedIcing();
        } else {
            console.log(chalk.magenta('Seems to already be icing data, exiting!'));
        }
    }).then(function () {
        return q.all([getShapesData(), getIcingsData(), getFillingsData(), getReviewsData(), getLayersData()]);
    })
    .spread(function (shapes, icings, fillings, reviews, layers) {
        // console.log('values', shapes, icings, fillings, layers, reviews);
        return seedCakes(shapes, icings, fillings, reviews, layers);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});







