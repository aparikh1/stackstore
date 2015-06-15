app.config(function ($stateProvider) {

    $stateProvider.state('storeCreate', {
        url: '/create-store',
        templateUrl: 'js/storeCreate/storeCreate.html',
        controller: 'StoreCreateCtrl'
    });


});

app.controller('StoreCreateCtrl', function ($scope, $state, StoreFCT, $stateParams, $rootScope, AuthService) {

    AuthService.getLoggedInUser().then(function (user) {
        user.admin = true;
        if(user.storeId) $state.go('adminHome', { storeId : user.storeId });
    });

    $scope.saveStore = function (store) {
        StoreFCT.createNewStore(store).then(function (data) {
            $rootScope.storeId = data.data._id;
            console.log('storeId', $rootScope.storeId);
            $state.go('adminHome', { storeId : data.data._id });
        });
    }
    // var cartData = [];

    // StoreFCT.getOne($stateParams.id)
    //     .then(function (data) {
    //         console.log('SINGLE CAKE', data);
    //         $scope.cake = data.data;
    //     });

    // $scope.addToCart = function (cake) {
    //     StoreFCT.addToCart($localStorage, cartData, cake);
    // }

    // $scope.removeFromCart = function (cake) {
    //     StoreFCT.removeFromCart($localStorage, cartData, cake);
    // }

});