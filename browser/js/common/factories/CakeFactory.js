app.factory('CakeFactory', function ($http) {

    return {
        getAllIngredients: function () {
            return $http.get('/api/cake_builder').then(function(ingredients){
                console.log("get ingredients hit from front end")
                return ingredients
            });
        }
    };

});
