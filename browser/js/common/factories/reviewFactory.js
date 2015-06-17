app.factory('reviewFCT', function ($http, $localStorage, CartFactory, AuthService) {

    var saveReview = function (reviewObj) {
        return $http.put('/api/review/', reviewObj, function (data) {
            return data.data;
        });
    }

    var getUnwrittenReviews = function () {
    	return $http.get('/api/review/unwritten').then(function (data) {
    		return data.data;
    	});
    }

    var getProductInfo = function (category, productId) {
        return $http.get('/api/review/'+category+'/'+productId).then(function (data) {
            return data.data;
        });
    }


    return {
        saveReview: saveReview,
        getUnwrittenReviews: getUnwrittenReviews,
        getProductInfo: getProductInfo
    };

});
