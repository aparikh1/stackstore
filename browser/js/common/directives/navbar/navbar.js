app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            var calculateNavBar = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.items = [
                        { label: 'Admin', state: 'adminHome({storeId : user.storeId})', adminAuth: true },
                        { label: 'Store', state: 'store' },
                        { label: 'Cart', state: 'cart'}
                    ];
                    // consolnode se.log('HERE');
                    if(user === null){
                        scope.items.push({ label: 'Signup', state: 'signup' });
                    } else {
                        if(!user.storeId) {
                            scope.items.push({ label: 'Create A Store', state: 'storeCreate', auth: true });
                        }
                    }
                });
            }
            calculateNavBar();

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('store');
                });
            };

            scope.isAdmin = function () {
                return AuthService.isAdminAuthenticated();
            }

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                    if(AuthService.isAdminAuthenticated()) {
                        // console.log('sTORE ID', user.storeId);
                        $state.go('adminHome', {storeId : user.storeId});
                    }
                    else {
                        $state.go('store');
                    }
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, calculateNavBar);
            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, calculateNavBar);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, calculateNavBar);
            $rootScope.$on(StoreFCT.saveStore, calculateNavBar);

        }

    };

});