(function () {
    "use strict";

    //module
    angular
        .module('app')
        .config(config)


    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider

        //TODO: home state wieder reinfrimmeln?

            .state('login', {
                url: '/login',
                templateUrl: 'login/index.html',
                controller: 'LoginController as vm'
            });
    }



}());