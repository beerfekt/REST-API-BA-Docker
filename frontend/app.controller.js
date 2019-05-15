(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    function LoginController($location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            console.log("logout");
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            console.log("login");
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/admin');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }
})();