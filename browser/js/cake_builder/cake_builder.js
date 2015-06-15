app.config(function ($stateProvider) {
    $stateProvider.state('cake-builder', {
        url: '/store/:storeId/cake-builder',
        templateUrl: 'js/cake_builder/cake_builder.html',
        controller: 'CakeBuilderCtrl'
    });

});

app.controller('CakeBuilderCtrl', function ($scope, AuthService, $state, CakeFactory) {


});