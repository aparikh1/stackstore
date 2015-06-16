app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $localStorage, CartFactory, CakeFactory) {

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
        console.log("should have set checkingout to true", $scope.checkingOut)
        $scope.error = null;

        var reCombinedCakes = []
        var stockCakes = []
        var customCakes = []
        var thisUser 

        AuthService.login(loginInfo).then(function (user) {
            

            //IMPLEMENT THE PARSING CUSTOM CAKES AND SAVE THEM TO DATABASE
            if($localStorage.length !== 0){

                var cartParseSave = function(locCart){
                    //address quantity for stock cakes
                    //address saving custom cakes

                    //parse cakes
                    
                    for(var i = 0; i<locCart.length; i++){
                        if(!locCart[i]._id) customCakes.push(locCart[i])
                        if(locCart[i]._id) stockCakes.push(locCart[i])
                    }
                    console.log("locCart preparsed", locCart)
                    console.log("custom cakes parsed", customCakes)
                    console.log("stock cakes parsed", stockCakes)
                    
                    //store custom cakes
                    // CakeFactory.storeManyCakes(customCakes).then(function(customCakes){
                    //     console.log("customCakes returned from storeManyCakes",customCakes)
                    //     reCombinedCakes.push(customCakes)
                    // })


                }
                cartParseSave($localStorage.cart)

                //still have to do inventory recalculation
                // var recalculateInventory = function(stockCakes){
     

                // }
                
            }
            thisUser = user
            return customCakes
        })
        .then(function(customCakes){
            
            return CakeFactory.storeManyCakes(customCakes)
        })
        .then(function(customCakes){
                console.log("now we're here, completed save")
                console.log("customCakes returned from storeManyCakes",customCakes)
                customCakes.forEach(function(cake){
                    stockCakes.push(cake)
                })
                console.log("recombined Cakes (new stock array) ", stockCakes)
                return thisUser;
            
        })
        .then(function (user) {
            console.log("thru first promise")
            return CartFactory.updateCart(stockCakes, user)
        })
        .then(function(){

            // if($localStorage.cart.length !== 0 && $scope.checkingOut === undefined){
            //     $state.go("storeViewProducts",{storeId : $scope.currentStore})
            // }
        
            // else if($scope.checkingOut){
                
            //     $state.go("cart")
            // }
            // else{
            //     $state.go('home');
                
            // }
            $localStorage.cart = [];

        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});