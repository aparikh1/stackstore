app.factory('AdminFCT', function ($http) {

    var getAllIcing = function() {
        return $http.get('/api/admin/icing', function (data) {
            console.log('Icing DATA', data);
            return data;
        });
    }

    var postNewIcing = function() {
        return $http.post('/api/admin/icing/create', function (data) {
            console.log('NEW ICING', data);
            return data; 
        });
    }

    var postEditIcing = function(icingId) {
        return $http.post('/api/admin/icing/'+icingId, function (data) {
            console.log('Edited ICING', data);
            return data; 
        });
    }

    var deleteIcing = function(icingId) {
        return $http.get('/api/icing/delete/'+icingId, function (data) {
            console.log('NEW ICING', data);
            return data; 
        });
    }

    return {
        getAllIcing: getAllIcing,
        postNewIcing: postNewIcing,
        postEditIcing: postEditIcing,
        deleteIcing: deleteIcing

    };

});
