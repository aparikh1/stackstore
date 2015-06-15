
app.factory('CartFactory', function ($http, AuthService, StoreFCT, $localStorage, $state) {

    return {
    	getCartByUser: function (user) {
    		return $http.get('/api/cart/' + user._id).then(function(response){
                console.log('response', response.data);
                return response.data;
            });	
    	},
    	createNewCart: function (cart, user) {
    		return $http.post('/api/cart/add', { cart : cart, user : user }, function (response) {
	            console.log('response', response);
	            // return response; 
	        });
    	},
        updateCart: function (cake, user) {
            console.log("here: store cake in auth cart")
            return $http.put('/api/cart/update', { cakes : cake, user : user }, function (response) {
	            console.log('response', response);
	            // return response; 
	        });
        },
        deleteFromCart: function (cake) {
            return $http.delete('/api/cart/' + cake._id).then(function(response){
                console.log('response', response);
                // return response;
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
        }

   };

});