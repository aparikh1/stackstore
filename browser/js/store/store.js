app.config(function ($stateProvider) {

    $stateProvider.state('store', {
        url: '/store',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl'
    });

    $stateProvider.state('storeSingle', {
        url: '/store/:id',
        templateUrl: 'js/store/storeSingle.html',
        controller: 'StoreSingleCtrl'
    });



});

app.controller('StoreSingleCtrl', function ($scope, $state, StoreFCT, $stateParams, $localStorage) {

    var cartData = [];

    StoreFCT.getOne($stateParams.id)
        .then(function (data) {
            console.log('SINGLE CAKE', data);
            $scope.cake = data.data;
        });

    $scope.addToCart = function (cake) {
        StoreFCT.addToCart($localStorage, cartData, cake);
    }

    $scope.removeFromCart = function (cake) {
        StoreFCT.removeFromCart($localStorage, cartData, cake);
    }

});

app.controller('StoreCtrl', function ($scope, AuthService, $state, StoreFCT, $localStorage) {

    var cartData = [];

    StoreFCT.getAll().then(function (data) {
        // console.log('DATA on controller', data.data);
        // $scope.products = data.data;
        $scope.products = data.data.map(function (obj) {
            obj.layerNum = obj.layers.length;
            obj.reviewNum = obj.reviews.length;
            return obj;
        });
            // console.log('OBJ', $scope.products);
    });

    $scope.addToCart = function (cake) {
        StoreFCT.addToCart($localStorage, cartData, cake);
    }

    $scope.removeFromCart = function (cake) {
        StoreFCT.removeFromCart($localStorage, cartData, cake);
    }



});