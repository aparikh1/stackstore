app.config(function ($stateProvider) {

    $stateProvider.state('store', {
        url: '/store',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl'
    });

    $stateProvider.state('storeViewProducts', {
        url: '/store/:storeId',
        templateUrl: 'js/store/storeSingle.html',
        controller: 'StoreSingleCtrl'
    });



});

app.controller('StoreSingleCtrl', function ($scope, AuthService, $state, StoreFCT, $stateParams, $localStorage, CartFactory) {

    StoreFCT.getAll($stateParams.storeId).then(function (data) {
    	console.log('data', data);
        $scope.products = data.data;
        // $scope.products = data.data.map(function (obj) {
        //     obj.layerNum = obj.layers.length;
        //     obj.reviewNum = obj.reviews.length;
        //     return obj;
        // });
    });


    var cartData = [];
    $scope.addToCart = function (cake) {
        if (AuthService.isAuthenticated()) {
            AuthService.getLoggedInUser().then(function (user) {
                StoreFCT.addToAuthCart(user, cake, CartFactory);
            });
        } else {
            StoreFCT.addToUnauthCart($localStorage, cartData, cake);
        }
    }

    $scope.removeFromCart = function (cake) {
        if (AuthService.isAuthenticated()) {
            AuthService.getLoggedInUser().then(function (user) {
                StoreFCT.removeFromAuthCart(user, cake, CartFactory);
            });
        } else {
            StoreFCT.removeFromUnauthCart($localStorage, cartData, cake);
        }
    }

});

app.controller('StoreCtrl', function ($scope, AuthService, $state, StoreFCT, $localStorage, CartFactory) {


    StoreFCT.getAllStores().then(function (data) {
        console.log('DATA', data.data);
        $scope.storeArray = data.data;
    });


    // $scope.addToCart = function (cake) {
    //     if (AuthService.isAuthenticated()) {
    //         AuthService.getLoggedInUser().then(function (user) {
    //             StoreFCT.addToAuthCart(user, cake, CartFactory);
    //         });
    //     } else {
    //         StoreFCT.addToUnauthCart($localStorage, cartData, cake);
    //     }
    // }

    // $scope.removeFromCart = function (cake) {
    //     if (AuthService.isAuthenticated()) {
    //         AuthService.getLoggedInUser().then(function (user) {
    //             StoreFCT.removeFromAuthCart(user, cake, CartFactory);
    //         });
    //     } else {
    //         StoreFCT.removeFromUnauthCart($localStorage, cartData, cake);
    //     }
    // }



});