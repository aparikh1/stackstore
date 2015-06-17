app.config(function ($stateProvider) {

    $stateProvider.state('store', {
        url: '/store',
        templateUrl: 'js/store/store.html',
        controller: 'StoreCtrl',

    });

    $stateProvider.state('storeViewProducts', {
        url: '/store/:storeId',
        templateUrl: 'js/store/storeSingle.html',
        controller: 'StoreSingleCtrl',
        resolve: {

            getColorScheme: function ($rootScope, $stateParams, StoreFCT) {
                return StoreFCT.getColorScheme($stateParams.storeId).then(function (colors) {
                    $rootScope.colorScheme = colors;
                    return colors;
                });
            }
        }
    });

});

app.controller('StoreSingleCtrl', function ($rootScope, $scope, $q, AuthService, $state, StoreFCT, StoreSingleFCT, $stateParams, $localStorage, CakeFactory, getColorScheme, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
                return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    var stores = [];

    CakeFactory.getAllCakes().then(function (allcakes) {

        $scope.products = allcakes;
        console.log('products', $scope.products);
        $scope.currentProducts = $scope.products;
        return allcakes;

    }).then(function (allcakes) {

        allcakes.forEach(function (cake) {
            stores.push(cake.storeId);
        });

        $scope.stores = _.uniq(stores, 'name');

    });
    
 
    $scope.addToCart = StoreSingleFCT.addToCart;

    $scope.removeFromCart = StoreSingleFCT.removeFromCart;

    $scope.currentStore = $localStorage.currentStore;

    $scope.colorScheme = getColorScheme;

    $scope.setStore = function (store) {
        console.log('store', store);
        console.log('sdfsdtest');

        console.log('Products', $scope.products);

        $scope.currentProducts = _.filter($scope.products, function (ele) {
            console.log('elem', ele);
            return ele.storeId._id === store._id;
        });

        console.log('currentProducts', $scope.currentProducts);

    }


});

app.filter('storeName', function () {
  return function (stores, allStores) {
    console.log('stores', stores);
    console.log('stores', storeId);

  };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('StoreCtrl', function ($rootScope, $scope, AuthService, $state, StoreFCT, $localStorage, CartFactory) {

    $rootScope.currentStore = undefined;

    $scope.storeCast = function(store){        
        $localStorage.currentStore = store;
    }

    StoreFCT.getAllStores().then(function (data) {
        $scope.storeArray = data.data;
    });


});