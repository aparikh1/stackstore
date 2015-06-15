app.factory('CartFactory', function ($http, StoreFCT, AuthService) {

   return {
       getCartByUser: function (user) {
           return $http.get('/api/cart/' + user._id).then(function(response){
               console.log('response', response);
               return response.data;
           });    
       },
       createNewCart: function (cart, user) {
           return $http.post('/api/cart/add', { cart : cart, user : user }, function (response) {
                console.log('response', response);
                // return response; 
            });
       },
       updateCart: function (cart, user) {
           return $http.put('/api/cart/update', { cart : cart, user : user }, function (response) {
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
       calculateCart: function (cart) {
		   var cartPrice = 0;
           cart.forEach(function(cake){
               cartPrice += cake.price;
           });

           return cartPrice;
       }
   };

});