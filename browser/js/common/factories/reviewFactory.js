app.factory('reviewFCT', function ($http, $localStorage, CartFactory, AuthService) {

    var saveReview = function (reviewObj) {
        return $http.post('/api/review/', reviewObj, function (data) {
            return data.data
        });
    }


    return {
        saveReview: saveReview
    };

});
