app.config(function ($stateProvider) {

    $stateProvider.state('adminHome', {
        url: '/admin',
        templateUrl: 'js/admin/home.html',
        controller: 'AdminCtrl'
    });

    $stateProvider
    .state('adminCategory', {
        url: '/admin/:category',
        templateUrl: 'js/admin/list.html',
        controller: 'AdminCateogryCtrl'
    });
    // .state('adminIcingEdit', {
    //     url: '/admin/icing',
    //     templateUrl: 'js/admin/cateogryEdit.html',
    //     controller: 'AdminIcingCtrl'
    // });

});

app.controller('AdminCtrl', function ($scope, $state, AdminFCT) {
    //nothing here yet
});

app.controller('AdminCateogryCtrl', function ($scope, $state, AdminFCT, $stateParams) {
    //nothing here yet
    console.log('CATEGORY', $stateParams.category);
    // AdminFCT.getAllIcing().then(function (data) {
    //     console.log('DATA FOR ICING', data);
    //     $scope.cateName = 'Icing';
    //     $scope.category = data.data;
    // });

});
