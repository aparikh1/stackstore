app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                // { label: 'Home', state: 'home' },
                // { label: 'About', state: 'about' },
                { label: 'Admin', state: 'adminHome({storeId : user.storeId})', adminAuth: true },
                { label: 'Store', state: 'store' },
                // { label: 'Tutorial', state: 'tutorial' },
                // { label: 'Members Only', state: 'membersOnly', auth: true },
                { label: 'Cart', state: 'cart'}
            ];

            AuthService.getLoggedInUser().then(function (user) {
                // console.log('USER', user);
                if(user === null){
                    scope.items.push({ label: 'Signup', state: 'signup' });
                } else {
                    if(!user.storeId) {
                        scope.items.push({ label: 'Create A Store', state: 'storeCreate', auth: true });
                    }
                }
            });


            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            scope.isAdmin = function () {
                return AuthService.isAdminAuthenticated();
            }

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});