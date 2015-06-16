app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $localStorage, CartFactory, OrderFactory, CakeFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.checkingOut = $localStorage.checkOut
    $scope.cart = $localStorage.cart
    $scope.currentStore = $localStorage.currentStore._id
    // console.log("cart should be full", $scope.cart)
    // console.log("this hsould be the curentStore", $scope.currentStore)

    console.log("before clicking checkout button shoud be false", $scope.checkingOut)

    $scope.sendLogin = function (loginInfo) {

        console.log("we just logged in")
        // console.log("should have set checkingout to true", $scope.checkingOut)
        $scope.error = null;

        var thisUser

        //log them in 

        AuthService.login(loginInfo).then(function (user) {
            thisUser = user
            console.log("login/retrieved user", user)

            return user
        })

        //.then search cart by user

        .then(function(user){
       
            return CartFactory.getCartByUser(user)
        
        }).then(function(cart){
            console.log("logged in and retrieiving cart from DB", cart)
            if(cart){
                //add to cart
                return OrderFactory.parseAndUpdateCart($scope, thisUser);

            }
            else{

                //call the function below
                return OrderFactory.parseAndCreateCart($scope, thisUser);

            }

        })
        .then(function(response){
            console.log("login end return cart details", response)
            if($scope.checkingOut === true){
                if(response.config.data.cart !== undefined){
                    var cart =  response.config.data.cart
                    var store = response.config.data.cart[0].storeId                    
                }
                if(response.config.data.cakes !== undefined){
                    var cart =  response.config.data.cakes
                    var store = response.config.data.cakes[0].storeId          
                }
                var user = response.config.data.user
                var total = CartFactory.calculateCart(cart)

                var cakes = cart.map(function (cake) {
                    return cake._id;
                });

                return OrderFactory.createNewOrder(store, cakes, total)

            }
        }).then(function(order){
            if($scope.checkingOut === true){
                console.log("order submitted")
            }
        })


    };

});