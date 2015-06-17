app.factory('StoreSingleFCT', function ($http, $state, $rootScope, AuthService, StoreFCT, $localStorage, CartFactory) {

    var getAll = function(storeId) {
        return $http.get(`/api/store/${storeId}`, function (data) {
            return data;
        });
    };


    var addToCart = function (cake) {
        if (AuthService.isAuthenticated()) {
            AuthService.getLoggedInUser().then(function (user) {
 
                CartFactory.getCartByUser(user).then(function (cart) {
                    $rootScope.numCartCakes = cart.cakes.length;
                });
                
                StoreFCT.addToAuthCart(user, cake, CartFactory);
            });
        } else {
            var cartData = [];
            $rootScope.numCartCakes = $localStorage.cart.length;
            StoreFCT.addToUnauthCart($localStorage, cartData, cake);
        }
        $state.go("added-item")
    };


    var removeFromCart = function (cake) {
        if (AuthService.isAuthenticated()) {
            AuthService.getLoggedInUser().then(function (user) {
                StoreFCT.removeFromAuthCart(user, cake, CartFactory);
            });
        } else {
            var cartData = []
            StoreFCT.removeFromUnauthCart($localStorage, cartData, cake);
        }
    };


    return {
        getAll: getAll,
        addToCart: addToCart,
        removeFromCart: removeFromCart
    };



});