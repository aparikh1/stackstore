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

    var addToAuthCart = function (user, cake, CartFactory) {
        
        CartFactory.updateCart(cake, user);

    };

    var removeFromAuthCart = function (user, cake, CartFactory) {

        CartFactory.deleteFromCart(cake);

    };

    var addToUnauthCart = function ($localStorage, cartData, cake) {

        if ($localStorage.cart) {
            cartData = $localStorage.cart;
        }

        cartData.push(cake);

        $localStorage.cart = cartData;
    };

    var removeFromUnauthCart = function ($localStorage, cartData, cake) {

        if (!$localStorage.cart) return;

        for (var i = 0; i < $localStorage.cart.length; i++) {
            if ($localStorage.cart[i]._id === cake._id) {
                $localStorage.cart.splice(i, 1)
            }
        }
    };

    return {
        getAll: getAll,
        getOne: getOne,
        addToAuthCart: addToAuthCart,
        addToUnauthCart: addToUnauthCart,
        removeFromAuthCart: removeFromAuthCart,
        removeFromUnauthCart: removeFromUnauthCart
    };

});
