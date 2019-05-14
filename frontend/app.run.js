(function () {
    "use strict";

    //why do use (function 'use-strict')
    //https://stackoverflow.com/questions/12957625/angularjs-controllers-and-use-strict

    //module
    angular
        .module('app')
        .run(run);

    /** @ngInject */
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // keep user logged in after page refresh
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }
            // redirect to login page if not logged in and trying to access a restricted page
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                var restrictedPages = ['/admin'];
                if ($location.path().includes(restrictedPages[0]) && !$localStorage.currentUser) {
                    $location.path('/login');
                }
            });
        });
    }

}());



