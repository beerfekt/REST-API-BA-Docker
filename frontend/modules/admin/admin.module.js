(function () {
    "use strict";

    //module
    angular
        .module('app.admin',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {
/*
        $urlRouterProvider.otherwise('home');

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'modules/home/views/home/index.html',
                controller: 'HomeController as vm'
            })

            .state('events', {
                url: '/events',
                templateUrl: 'modules/admin/events/index.html',
                controller:'EventsController as vm'
            })

            .state('events.create', {
                url: '/create',
                templateUrl: 'modules/events/views/event/create.html',
                controller:'EventController as vm'
            })




            .state('events.done', {
                url: '/done',
                templateUrl: 'modules/events/views/event/done.html',
                controller:'EventController as vm'
            })
            */

    } //config

}());