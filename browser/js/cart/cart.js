app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {

        	getCartOfCakes: function (AuthService, $localStorage, $q, CakeFactory, CartFactory) {

                return AuthService.getLoggedInUser().then(function (user) {

                    if (user) {
                        return CartFactory.getCartByUser(user);
                    } else {
                        return $localStorage.cart;
                    }

                }).then(function (userCart) {

                    if (userCart.cakes) {

                        var cakes = userCart.cakes.map(function (cake) {
                            return CakeFactory.getCakes(cake);
                        });

                        return $q.all(cakes);

                    } else {
                        return userCart;
                    }

                }).then(function (cakes) {
                    return cakes;
                });
            },

        	isAuthenticated: function (AuthService) {

        		return AuthService.isAuthenticated();
        	}
        }
    });

});


app.controller('CartCtrl', function ($scope, CakeFactory, $state, $stateParams, $localStorage, CartFactory, OrderFactory, getCartOfCakes, AuthService, isAuthenticated) {

    $scope.cart = getCartOfCakes;

    $scope.localCart = $localStorage.cart

    console.log('scope.cart', $scope.cart);

    $scope.price = CartFactory.calculateCart($scope.cart);

    $scope.currentStore = $localStorage.currentStore;

    $scope.checkout = function (cart) {

        if(!AuthService.isAuthenticated()){
            $state.go("signup")
        }

        var store = cart[0].storeId;

        var cakes = cart.map(function (cake) {
            return cake._id;
        });

        console.log("arrayed cakes", cakes)
        console.log("authenticated?", AuthService.isAuthenticated() )

        if (AuthService.isAuthenticated()) {
            OrderFactory.createNewOrder(store, cakes, $scope.price).then(function(order){
                console.log(order)
                delete $scope.cart
            // $state.go()
            })
    	}
    	
    };


});