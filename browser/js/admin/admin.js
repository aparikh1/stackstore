app.config(function ($stateProvider) {

    $stateProvider.state('adminHome', {
        url: '/store/:storeId/admin',
        templateUrl: 'js/admin/home.html',
        controller: 'AdminCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminStockCakes', {
        url: '/store/:storeId/admin/cake',
        templateUrl: 'js/admin/cake/list.html',
        controller: 'AdminCakeCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminUsers', {
        url: '/store/:storeId/admin/users',
        templateUrl: 'js/admin/users.html',
        controller: 'AdminUsersCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminStockCakes.outOfStock', {
        url: '/store/:storeId/admin/cake/out',
        templateUrl: 'js/admin/cake/list.html',
        controller: 'AdminCakeQuantityCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminOrders', {
        url: '/store/:storeId/admin/orders',
        templateUrl: 'js/admin/orders/list.html',
        controller: 'AdminOrderCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminCategory', {
        url: '/store/:storeId/admin/:category',
        templateUrl: 'js/admin/list.html',
        controller: 'AdminCateogryCtrl',
        data: { adminAuthenticate: true }
    });

});

app.controller('AdminCtrl', function ($scope, $state, AdminFCT, $stateParams) {
    AdminFCT.getStoreInfo($stateParams.storeId).then(function (data) {
        $scope.storeName = data.data.name;
        console.log('DATA', data);
    });

    $scope.storeId = $stateParams.storeId;
});




app.controller('AdminUsersCtrl', function ($scope, $state, AdminFCT, AuthService, $stateParams) {
    $scope.storeId = $stateParams.storeId;
    $scope.searchInput = false;
    AuthService.getLoggedInUser($stateParams.storeId).then(function (user){
        $scope.theUser = user;
    });

    AdminFCT.getAdminUsers($stateParams.storeId).then(function (data){
        $scope.userList = data.data;
    });

    $scope.removeAdminStatus = function (userId) {
        AdminFCT.removeAdminStatus($stateParams.storeId, userId).then(function (){
            $scope.userList = $scope.userList.filter(function (user){
                if(user._id !== userId) return user;
            });
        });
    }

    $scope.searchNonAdminUser = function () {
        $scope.searchInput = true;
        $scope.searchReturn = [];
    }

    $scope.searchUser = function (email) {
        AdminFCT.searchNonAdminUser($stateParams.storeId, email).then(function (data) {
            $scope.searchReturn = data.data;
        });
    }

    $scope.makeAdmin = function (userId) {
        AdminFCT.makeAdminUser($stateParams.storeId, userId).then(function (data) {
            $scope.searchReturn = [];
            $scope.searchInput = false;
            $scope.userList.push(data.data);
        });
    }

});

// app.filter('adminCakes', function () {
//     console.log(arguments);
//     // return function (cake, state) {
//         // console.log(args);
//         // console.log('CAke',cake);
//         // console.log('State',state);
//         // if(cake.quantity < 5) {
//             // return cake
//         // }
//         // return cake;
//     // }
// });


app.controller('AdminOrderCtrl', function ($scope, AdminFCT) {
    // AdminFCT.getAllOrders().then(function (data) {
    //     $scope.orderList = data.data;
    // });
});

app.controller('AdminCakeCtrl', function ($scope, $state, AdminFCT, $stateParams, StoreSingleFCT) {
    console.log("You are in AdminCakeCtrl")
    $scope.storeId = $stateParams.storeId;
    console.log("this hsould be store ID", $scope.storeId)
    StoreSingleFCT.getAll($stateParams.storeId).then(function (data) {
        $scope.cakeList = data.data;
        console.log("here are the cakes you should see", data)
    });



    $scope.newCake = false;
    $scope.activeCakeEditId = '';


    $scope.showEditCake = function(cakeId) {
        $scope.newCake = false;
        $scope.activeCakeEditId = cakeId;
    }

    $scope.deleteCake = function(itemId) {
        // AdminFCT.deleteIcing(itemId).then(function (data) {
        //     $scope.itemList = $scope.itemList.filter(function (obj) {
        //         if(obj._id !== itemId) return obj;
        //     });
        // });
    }
});

var firstCap = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

app.controller('AdminCateogryCtrl', function ($scope, $state, AdminFCT, $stateParams) {
    $scope.storeId = $stateParams.storeId;
    $scope.activeEditId = '';
    AdminFCT.getAllCategory($stateParams.storeId, $stateParams.category).then(function (data) {
        $scope.cateName = firstCap($stateParams.category);
        console.log($scope.cateName);
        $scope.itemList = data.data;
    });


    $scope.saveItem = function(item) {

        if(item._id) {
            AdminFCT.postEditCategory($stateParams.storeId, $stateParams.category, item).then(function (data) {
                $scope.itemList.map(function (obj) {
                    if(obj._id === item._id) return data.data;
                    else return obj;
                });
            });
        } else {
            AdminFCT.postNewCategory($stateParams.storeId, $stateParams.category, item).then(function (data) {
                $scope.itemList.push(data.data); 
            });
        }

        $scope.activeEditId = '';
        $scope.item = {};
        $scope.newItem = false;
    }
    $scope.deleteItem = function(itemId) {
        AdminFCT.deleteCategory($stateParams.storeId, $stateParams.category, itemId).then(function (data) {
            $scope.itemList = $scope.itemList.filter(function (obj) {
                if(obj._id !== itemId) return obj;
            });
        });
    }



    $scope.showEditItem = function(itemId) {
        $scope.newItem = false;
        $scope.activeEditId = itemId;
    }

    $scope.removeForm = function() {
        console.log('fire');
        $scope.newItem = false;
        $scope.activeEditId = '';

    }
});