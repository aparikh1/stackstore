app.factory('CakeFactory', function ($http, $localStorage, CartFactory, AuthService) {

    return {

    	getCakes: function (cakeid) {
    		if (cakeid) {
    			return $http.get('/api/cake/' + cakeid).then(function(response){
	            	console.log('response.data', response.data);
	                return response.data;
	            });
    		}
            
        },

        getAllIngredients: function (storeId) {
            return $http.get('/api/store/'+storeId+'/cake_builder').then(function(ingredients){
                console.log("get ingredients hit from front end", ingredients)
                
                return ingredients
            });
        },
        
        storeCake: function (cakeObj){

            delete $localStorage.cake
            delete $localStorage.currentPrices

            console.log("cake before remove numOrdered",cakeObj)
            var numOrdered = cakeObj.numOrdered
            delete cakeObj.numOrdered
            console.log("cake after remove numOrdered",cakeObj)

            if (AuthService.isAuthenticated()) {
                return $http.post('/api/store/'+cakeObj.storeId+'/cake_builder', cakeObj).then(function(cake){

            		console.log("cake returned after save",cake)
                    CartFactory.addToCart(cake)
            		return cake

            	});
            }
            else
            {
                CartFactory.addToCart(cakeObj)

            }
        }

    };

});
