app.factory('StoreFCT', function ($http) {

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
                $localStorage.cart.splice(i, 1);
            }
        }
    };

    var createNewStore = function (store) {
        
        console.log("hit create store function, here is store", store)
        return $http.post('/api/create/store', store, function (data){
            return data;
        });
    }

    var getAllStores = function() {
        return $http.get('/api/store', function (data) {
            return data;
        });
    }

    return {

        getOne: getOne,
        addToAuthCart: addToAuthCart,
        addToUnauthCart: addToUnauthCart,
        removeFromAuthCart: removeFromAuthCart,
        removeFromUnauthCart: removeFromUnauthCart,
        createNewStore: createNewStore,
        getAllStores: getAllStores
    };

});
