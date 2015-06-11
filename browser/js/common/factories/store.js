app.factory('StoreFCT', function ($http) {


    var getAll = function() {
        return $http.get('/api/store/', function (data) {
            console.log('CAKE DATA', data);
            return data;
        });
    };

    var getOne = function(cakeId) {
        return $http.get('/api/store/'+cakeId, function (data) {
            console.log('SINGLE DATA', data);
            return data;
        });
    };

    var addToCart = function ($localStorage, cartData, cake) {
        // we will need a condition here to handle authenticated users

        if ($localStorage.cart) {
            cartData = $localStorage.cart;
        }

        cartData.push(cake);

        $localStorage.cart = cartData;
    };

    var removeFromCart = function ($localStorage, cartData, cake) {
        if (!$localStorage.cart) return;

        for (var i = 0; i < $localStorage.cart.length; i++) {
            if ($localStorage.cart[i]._id === cake._id) {
                $localStorage.cart.splice(i, 1)
            }
        }
    }

    return {
        getAll: getAll,
        getOne: getOne,
        addToCart: addToCart,
        removeFromCart: removeFromCart
    };

});
