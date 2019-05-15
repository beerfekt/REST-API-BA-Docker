(function () {
    "use strict";

    //module
    angular
        .module('app.public',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('public.home');

        $stateProvider
            .state('public', {
                url: '/public',
                templateUrl: 'modules/public/index.html',
                controller: 'Public.HomeController as vm'
            })

            .state('public.home', {
                url: '/home',
                templateUrl: 'modules/public/home/index.html',
                controller: 'Public.HomeController as vm'
            })


            .state('public.events', {
                url: '/events',
                templateUrl: 'modules/public/events/index.html',
                controller:'Public.EventsController as vm'
            })

            .state('public.events.list', {
                url: '/list',
                templateUrl: 'modules/public/events/views/events/list.html',
                controller:'Public.EventsController as vm'
            })


    } //config

}());