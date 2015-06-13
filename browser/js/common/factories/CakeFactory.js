app.factory('CakeFactory', function ($http, $localStorage, CartFactory, AuthService, $state) {

    return {
        getAllIngredients: function (storeId) {
            return $http.get('/api/store/'+storeId+'/cake_builder').then(function(ingredients){
                console.log("get ingredients hit from front end", ingredients)
                
                return ingredients
            });
        },
        storeCake: function (cakeObj, storeId){

            
            if (AuthService.isAuthenticated()) {
                return $http.post('/api/store/'+storeId+'/cake_builder', cakeObj).then(function(cake){

            		console.log("cake returned after save",cake)
                    CartFactory.addToCart(cake)

                    delete $localStorage.cake
            		delete $localStorage.currentPrices

            		return cake
            	});
            }
            else
            {
                console.log(cakeObj)
                CartFactory.addToCart(cakeObj)
                $state.go("signup")

            }
        }

    };

});
