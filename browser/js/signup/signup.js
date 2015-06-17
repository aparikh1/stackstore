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

    $scope.checkingOut = $localStorage.checkingOut
    console.log("local storage currentstore",$localStorage.currentStore)

    $scope.sendLogin = function (signupInfo) {

        $scope.error = null;
        
        AuthService.signup(signupInfo).then(function (user) {
            if($localStorage.cart === undefined) $localStorage.cart = []
                return CartFactory.createNewCart($localStorage.cart, user)
        }).then(function () {
            $localStorage.cart = [];
            if($scope.checkingOut){
                $state.go('cart')
            }
            else{
                $state.go('store');
            }
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});