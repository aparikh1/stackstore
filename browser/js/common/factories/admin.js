app.factory('AdminFCT', function ($http) {

    var getAllCategory = function(category) {
        console.log('GETTING ALL')
        return $http.get('/api/admin/category/'+category, function (data) {
            return data;
        });
    }
    var postNewCategory = function(category, item) {
        return $http.post('/api/admin/category/'+category, item, function (data) {
            return data; 
        });
    }
    var postEditCategory = function(category, item) {
        var id = item._id;
        delete item.__v;
        // delete item._id;
        // delete item.reviews;
        return $http.put('/api/admin/category/'+category+'/'+id, item, function (data) {
            return data; 
        });
    }
    var deleteCategory = function(category, itemId) {
        return $http.delete('/api/admin/category/'+category+'/'+itemId, function (data) {
            return data; 
        });
    }




    var getAllCake = function() {
        return $http.get('/api/admin/cake', function (data) {
            return data;
        });
    }
    var postNewCake = function(item) {
        return $http.post('/api/admin/cake/create', item, function (data) {
            return data; 
        });
    }
    var postEditCake = function(item) {
        var id = item._id;
        delete item.__v;
        // delete item._id;
        // delete item.reviews;
        return $http.post('/api/admin/cake/'+id, item, function (data) {
            return data; 
        });
    }
    var deleteCake = function(cakeId) {
        return $http.get('/api/admin/cake/delete/'+cakeId, function (data) {
            return data; 
        });
    }   





    var getAdminUsers = function() {
        return $http.get('/api/admin/users', function (data) {
            return data;
        });
    }

    var removeAdminStatus = function(userId) {
        return $http.put('/api/admin/users/'+userId, {admin: false},function (data) {
            return data;
        });
    }

    var searchNonAdminUser = function(userId) {
        return $http.post('/api/admin/users/search', {blah:'blah'}, function (data) {
            return data;
        });
    }

    return {

        getAllCategory: getAllCategory,
        postNewCategory: postNewCategory,
        postEditCategory: postEditCategory,
        deleteCategory: deleteCategory,

        getAllCake: getAllCake,
        postNewCake: postNewCake,
        postEditCake: postEditCake,
        deleteCake: deleteCake,

        getAdminUsers: getAdminUsers,
        removeAdminStatus: removeAdminStatus,
        searchNonAdminUser: searchNonAdminUser
    };

});
