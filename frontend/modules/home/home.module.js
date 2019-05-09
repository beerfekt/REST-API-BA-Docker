(function () {
    "use strict";

    //module
    angular
        .module('app.home',[])
        .config(config)


    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/home/views/home/index.html',
                controller: 'HomeController as vm'
            })
    } //config

}());