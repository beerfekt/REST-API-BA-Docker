(function () {
    "use strict";

    //module
    angular
        .module('app.public',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/public/home/index.html',
                controller: 'HomeController as vm'
            })

            .state('events', {
                url: '/events',
                templateUrl: 'modules/public/events/index.html',
                controller:'EventsController as vm'
            })

            .state('events.list', {
                url: '/list',
                templateUrl: 'modules/public/events/views/events/list.html',
                controller:'EventsController as vm'
            })


    } //config

}());