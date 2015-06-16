app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, AuthService, $state, $localStorage, CartFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.checkingOut = $localStorage.checkOut
    $scope.cart = $localStorage.cart
    $scope.currentStore = $localStorage.currentStore._id
    // console.log("cart should be full", $scope.cart)
    // console.log("this hsould be the curentStore", $scope.currentStore)
    
    // console.log("before clicking checkout button shoud be false", $scope.checkingOut)    

    $scope.sendLogin = function (signupInfo) {

        $scope.error = null;
        // console.log("should have set checkingout to true", $scope.checkingOut)
        
        AuthService.signup(signupInfo).then(function (user) {
            if($localStorage.cart.length !== 0){
                CartFactory.createNewCart($localStorage.cart, user)
            }                
        
        }).then(function () {
    
            if($localStorage.cart.length !== 0 && $scope.checkingOut === undefined){
                $state.go("storeViewProducts",{storeId : $scope.currentStore})
            }
        
            else if($scope.checkingOut){
                $state.go("cart")
            }
            else{
                $state.go('home');
                
            }
            $localStorage.cart = [];


        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});