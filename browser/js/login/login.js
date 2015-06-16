app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $localStorage, CartFactory) {

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

        AuthService.login(loginInfo).then(function (user) {
            console.log('user', loginInfo);
            CartFactory.updateCart($localStorage.cart, user);
        }).then(function () {
            $localStorage.cart = [];
            $state.go('store');
            // $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

            //IMPLEMENT THE PARSING CUSTOM CAKES AND SAVE THEM TO DATABASE

            var cartParseSave = function(locCart){
                //address quantity for stock cakes
                //address saving custom cakes

                //parse 
                var stockCakes = [];
                var customCakes = [];
                for(var i = 0; i<locCart.length; i++){
                    if(!locCart[i]._id) customCakes.push(locCart[i]);
                    if(locCart[i]._id) stockCakes.push(locCart[i]);
                }
                console.log("locCart preparsed", locCart);
                console.log("custom cakes parsed", customCakes);
                console.log("stock cakes parsed", stockCakes);
                //store custom cakes
                // for(var i = 0 ; i<customCakes; )
                

            }
        // cartParseSave($localStorage.cart);

        // return user;
    };
        // .then(function () {
        //     CartFactory.updateCart($localStorage.cart, user).then(function){
        //     })
        // .then(function(){
        //     if($localStorage.cart.length !== 0 && $scope.checkingOut === undefined){
        //         $state.go("storeViewProducts",{storeId : $scope.currentStore})
        //     }
        //     else if($scope.checkingOut){
        //         $state.go("cart")
        //     }
        //     else{
        //         $state.go('home');
        //     }
        //     $localStorage.cart = [];
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });
});