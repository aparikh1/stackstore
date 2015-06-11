app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/localCart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    });

});


app.controller('CartCtrl', function ($scope, $state, StoreFCT, $stateParams, $localStorage) {

    var cartData = [];
    // console.log('test', $localStorage);
    $scope.localCart = $localStorage;
    // $scope.items = 

});