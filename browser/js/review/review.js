app.config(function ($stateProvider) {
	$stateProvider.state('reviewList', {
		url:'/review/',
		templateUrl: 'js/review/reviewList.html',
		controller: 'reviewFormCtrl',
		resolve: {
			isAuthenticated: function (AuthService) {
				return AuthService.isAuthenticated();
			}
		}
	});

	$stateProvider.state('reviewItem', {
		url: '/review/:category/:reviewId/:productId',
		templateUrl: 'js/review/review.html',
		controller: 'reviewProductCtrl'
	});
});

app.controller('reviewFormCtrl', function ($scope, AuthService, $state, $stateParams, reviewFCT) {
	reviewFCT.getUnwrittenReviews().then(function (data) {
		$scope.reviewList = data;
	});
	// $scope.review = {};
	// $scope.review.user = $stateParams.userId;
	// $scope.review.productId = $stateParams.productId;
	// $scope.review.category = $stateParams.type;
});

app.controller('reviewProductCtrl', function ($scope, $state, $stateParams, reviewFCT) {
	reviewFCT.getProductInfo($stateParams.category, $stateParams.productId).then(function (data) {
		$scope.itemName = data.name;
		$scope.store = data.storeId.name;
		console.log('DATA', data);
	});

	$scope.review = {
		reviewId: $stateParams.reviewId,
		category: $stateParams.category,
		productId: $stateParams.productId
	}

	$scope.saveReview = function (review) {
		reviewFCT.saveReview(review).then(function (data) {
			// console.log('FINISHED AND IN RPCTRL');
			reviewFCT.getUnwrittenReviews().then(function (data) {
				if(data.length == 0) $state.go('store');
				else $state.go('reviewList');
			});
		});
	}
});