app.factory('CakeFactory', function ($http, $localStorage, CartFactory, AuthService, StoreSingleFCT, $stateParams) {

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

            console.log("this is what is being passed into storeCake. cakeObj.numOrdered", cakeObj.numOrdered)


            if(cakeObj.numOrdered === undefined) cakeObj.numOrdered = 1;
            console.log("before cakeObj.numOrdered removed", cakeObj.numOrdered)
            var numOrdered = cakeObj.numOrdered
            delete $localStorage.cake
            delete $localStorage.currentPrices

            if (AuthService.isAuthenticated()) {
                return $http.post('/api/store/'+cakeObj.storeId+'/cake_builder', cakeObj).then(function(cake){

                    console.log("cake returned after save",cake.data)
                    $localStorage.lastCake = cake.data
                    StoreSingleFCT.addToCart(cake.data)
                    return cake

                });
            }
            else
            {
                StoreSingleFCT.addToCart(cakeObj)

            }
        },
        setCakeLocal: function(cake, priceTracker){
                            for(var key in cake){
                                $localStorage.cake[key] = cake[key]
                                
                            }
                            for(var keyd in priceTracker){
                                $localStorage.currentPrices[keyd] = priceTracker[keyd]
                            }
    
                            delete cake.key
                            delete priceTracker.keyd
        },
        updatePrice: function(scope){
                           
                            scope.layerTwo = $localStorage.currentPrices.layerTwo
                            scope.layerThree = $localStorage.currentPrices.layerThree

                            scope.cake.price = 0;

                            if(scope.currentPrices.icing){
                                scope.cake.price += scope.currentPrices.icing.price;
                            }
                            
                            if(scope.currentPrices.layers[0].filling !== null){
                                scope.cake.price += scope.currentPrices.layers[0].filling.price
                            }
                            
                            //if there are second and third layers, add their price
                            if($localStorage.currentPrices.layerTwo){
                                if(scope.currentPrices.layers[1].filling !== null){
                                    scope.cake.price += scope.currentPrices.layers[1].filling.price
                                }
                            }
                            if($localStorage.currentPrices.layerThree){
                                if(scope.currentPrices.layers[2].filling !== null){
                                    scope.cake.price += scope.currentPrices.layers[2].filling.price
                                }
                            }
                            if(scope.currentPrices.numOrdered){
                                scope.cake.price *= parseInt(scope.currentPrices.numOrdered)
                            }
                            console.log("cake", scope.cake)    

        },
        // storeCake: function(cake){
        //                 if(cake.numOrdered === undefined) cake.numOrdered = 1;
        //                 console.log("check on add to see if numOrdered is autopopulated", cake)
        //                 delete $localStorage.cake
        //                 delete $localStorage.currentPrices
        //                 StoreSingleFCT.addToCart(cake)
                    
        // },
        loadCakeFromLocal: function (scope){
                        scope.cake = $localStorage.cake;
                        scope.currentPrices = $localStorage.currentPrices   
                        
                        //persist layer selection from local storage
                        scope.layerTwo = $localStorage.currentPrices.layerTwo
                        scope.layerThree = $localStorage.currentPrices.layerThree 

        },
        setScopeProps: function(scope){

                    //create layers templates for cake object
                    scope.cake = {layers:[{ position: 1, filling: null}
                        ,{position: 2, filling: null},{ position: 3, filling: null}], type: "custom"}

                    scope.currentPrices = {layers:[{ position: 1, filling: null}
                        ,{position: 2, filling: null},{ position: 3, filling: null}], type: "custom"}

                    if(!$localStorage.cake){
                        $localStorage.cake = {layers:[{ position: 1, filling: null}
                            ,{position: 2, filling: null},{ position: 3, filling: null}], type: "custom"}
                    }

                    if(!$localStorage.currentPrices){
                        $localStorage.currentPrices = {layers:[{ position: 1, filling: null}
                            ,{position: 2, filling: null},{ position: 3, filling: null}], type: "custom"}
                        
                    }

                    //for selecting the property to update w update function
                    scope.selectedNumLayers = "selectedNumLayers"
                    scope.numLayers = [1,2,3]

                    //
                

  
                    //bring storeId to scope and place on cake
                    scope.storeId = $stateParams.storeId
                    scope.cake.storeId = $stateParams.storeId
                    $localStorage.cake.storeId = $stateParams.storeId
        }

    };

});
