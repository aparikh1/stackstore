
app.factory('CartFactory', function ($http, AuthService, StoreFCT, $localStorage, $state) {

    return {
    	getCartByUser: function (user) {
    		return $http.get('/api/cart/' + user._id).then(function(test){
                console.log('test', test);
                return test;
            });	
    	},
    	createNewCart: function (cart, user) {
    		return $http.post('/api/cart/add', { cart : cart, user : user }, function (data) {
	            console.log('data', data);
	            // return data; 
	        });
    	},
        updateCart: function (cart, user) {
            return $http.put('/api/cart/update', { cart : cart, user : user }, function (data) {
	            console.log('data', data);
	            // return data; 
	        });
        },
        deleteFromCart: function (cake) {
            return $http.delete('/api/cart/' + cake._id).then(function(test){
                console.log('test', test);
                // return test;
            });	
        },
        calculateCart: function(cart){
            var cartPrice = 0;
            if(cart !== undefined){
                cart.forEach(function(cake){
                    cartPrice += cake.price;
                })
            }
            return cartPrice;
        },
        // addToCart: function (cake) {

        //     console.log("add to cart received cake", cake)

        //     $state.go("signup")

        //     if (AuthService.isAuthenticated()) {

        //         AuthService.getLoggedInUser().then(function (user) {
        //             return $http.put('/api/cart/update', { cart : cake, user : user }, function (data) {
        //                 console.log('data', data);
        //                 // return data; 
        //             });
        //         });

        //     } else {

        //         StoreFCT.addToUnauthCart($localStorage, [], cake);

        //     }
        // },
        
        // removeFromCart: function (cake) {

        //     if (AuthService.isAuthenticated()) {

        //         AuthService.getLoggedInUser().then(function (user) {
        //             StoreFCT.removeFromAuthCart(user, cake, CartFactory);
        //         });

        //     } else {

        //         StoreFCT.removeFromUnauthCart($localStorage, [], cake);

        //     }

        // }

   };

});