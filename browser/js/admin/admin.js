app.config(function ($stateProvider) {

    $stateProvider.state('adminHome', {
        url: '/admin',
        templateUrl: 'js/admin/home.html',
        controller: 'AdminCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminStockCakes', {
        url: '/admin/cake',
        templateUrl: 'js/admin/cake/list.html',
        controller: 'AdminCakeCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminUsers', {
        url: '/admin/users',
        templateUrl: 'js/admin/users.html',
        controller: 'AdminUsersCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminStockCakes.outOfStock', {
        url: '/admin/cake/out',
        templateUrl: 'js/admin/cake/list.html',
        controller: 'AdminCakeQuantityCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminOrders', {
        url: '/admin/orders',
        templateUrl: 'js/admin/orders/list.html',
        controller: 'AdminOrderCtrl',
        data: { adminAuthenticate: true }
    });

    $stateProvider.state('adminCategory', {
        url: '/admin/:category',
        templateUrl: 'js/admin/list.html',
        controller: 'AdminCateogryCtrl',
        data: { adminAuthenticate: true }
    });

});

app.controller('AdminCtrl', function ($scope, $state, AdminFCT) {
    //nothing here yet
});
app.controller('AdminUsersCtrl', function ($scope, $state, AdminFCT, AuthService) {
    AuthService.getLoggedInUser().then(function (user){
        $scope.theUser = user;
    });

    AdminFCT.getAdminUsers().then(function (data){
        $scope.userList = data.data;
    });

    $scope.removeAdminStatus = function (userId) {
        AdminFCT.removeAdminStatus(userId).then(function (){
            $scope.userList = $scope.userList.filter(function (user){
                if(user._id !== userId) return user;
            });
        });
    }

    $scope.searchNonAdminUser = function () {
        AdminFCT.searchNonAdminUser().then(function (data) {
            console.log('DATA', data);
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

app.controller('AdminCakeCtrl', function ($scope, $state, AdminFCT) {
    AdminFCT.getAllCake().then(function (data) {
        $scope.icingList = data.data[0];
        $scope.fillingList = data.data[1];
        $scope.shapeList = data.data[2];
        $scope.cakeList = data.data[3];
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

    $scope.activeEditId = '';
    AdminFCT.getAllCategory($stateParams.category).then(function (data) {
        $scope.cateName = firstCap($stateParams.category);
        console.log($scope.cateName);
        $scope.itemList = data.data;
    });


    $scope.saveItem = function(item) {

        if(item._id) {
            AdminFCT.postEditCategory($stateParams.category, item).then(function (data) {
                $scope.itemList.map(function (obj) {
                    if(obj._id === item._id) return data.data;
                    else return obj;
                });
            });
        } else {
            AdminFCT.postNewCategory($stateParams.category, item).then(function (data) {
                $scope.itemList.push(data.data); 
            });
        }

        $scope.activeEditId = '';
        $scope.item = {};
        $scope.newItem = false;
    }
    $scope.deleteItem = function(itemId) {
        AdminFCT.deleteCategory($stateParams.category, itemId).then(function (data) {
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
        $scope.newItem = false;
        $scope.activeEditId = '';

    }
});