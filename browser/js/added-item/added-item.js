app.config(function ($stateProvider) {
    $stateProvider.state('added-item', {
        url: '/store/added-item',
        templateUrl: 'js/added-item/added-item.html',
        controller: 'AddedItemCtrl'
    });

});

app.controller('AddedItemCtrl', function ($rootScope, $scope, AuthService, $state, CakeFactory, $localStorage, StoreFCT, CartFactory) {

    if (AuthService.isAuthenticated()) {
    	$scope.lastCake = $localStorage.lastCake
    	delete $localStorage.lastCake
    } else {
        $scope.lastCake = $localStorage.cart[$localStorage.cart.length-1]
    }
	
	// $scope.storeId = $scope.lastCake.storeId
	// $rootScope.$on('storeCast', function (event, args) {
	// 	$scope.currentStore = args.store;
	// 	$scope.$digest()
	// 	console.log($scope.currentStore);
	// });
	$scope.currentStore = $localStorage.currentStore

});