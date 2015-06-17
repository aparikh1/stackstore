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
        if (AuthService.isAuthenticated()) {


            OrderFactory.createNewOrder(calculateOrders($scope.cart)).then(function (order) {
                console.log('order', order);
            });
    	}
    };

    var calculateOrders = function (cakeArray) {
        var retArr = [];
        var orderObj = function(storeId) {
            this.storeId = storeId;
            this.cakes = [];
            this.total = 0;
        }
        cakeArray.forEach(function (cake) {
            console.log('CAKE', cake);
            if(!retArr.length) {
                retArr.push(new orderObj(cake.storeId));
                retArr[0].cakes.push(cake._id);
                retArr[0].total += cake.price;
            }
            else {
                var exists = false;
                var index = null;
                for(var i=0; i < retArr.length;i++) {
                    if(retArr[i].storeId === cake.storeId) {
                        exists = true;
                        retArr[i].cakes.push(cake._id);
                        retArr[i].total += cake.price;
                    }
                }
                if(!exists) {
                    retArr.push(new orderObj(cake.storeId.toString()));
                    retArr[retArr.length-1].cakes.push(cake._id);
                    retArr[retArr.length-1].total += cake.price;
                }
            }
        });
        return retArr;
    }


});