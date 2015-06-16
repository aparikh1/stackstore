app.factory('OrderFactory', function ($http, StoreFCT, AuthService) {

   return {
       createNewOrder: function (store, cakes, total) {
           return $http.post('/api/order/', { store : store, cakes : cakes, total : total }, function (response) {
                console.log('response', response);
                return response.data; 
           });
       },
       completeOrder: function (orderId) {
       		return $http.put('/api/order/'+orderId+'/complete', {status: 'Complete'}, function (data) {
       			return data.data;
       		});
       }
   };

});