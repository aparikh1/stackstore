app.factory('CakeFactory', function ($http, $localStorage, CartFactory) {

    return {
    	getCakes: function (cakeid) {
    		if (cakeid) {
    			return $http.get('/api/cake/' + cakeid).then(function(response){
	            	console.log('response.data', response.data);
	                return response.data;
	            });
    		}
            
        },
        getAllIngredients: function () {
            return $http.get('/api/cake_builder').then(function(ingredients){
                // console.log("get ingredients hit from front end")
                return ingredients
            });
        },
        storeCake: function (cakeObj){
        	return $http.post('/api/cake_builder', cakeObj).then(function(cake){
        		// console.log("cake sent to database");
        		// console.log(cake)
        		delete $localStorage.cake
        		delete $localStorage.currentPrices
        		return cake
        	});
        }
        // ,
        // deleteCake: function (cakeName){
        // 	console.log("hit the deleteCake", cakeName)
        // 	return $http.delete('/api/cake_builder/'+cakeName).then(function(cake){
        // 		console.log("cake delete complete on front end")
        // 		return cake
        // 	})
        // }
    };

});
