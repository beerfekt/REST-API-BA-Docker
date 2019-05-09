(function () {
    "use strict";
//module

    angular
        .module('app.events',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('events');

        $stateProvider

            .state('events', {
                url: '/events',
                templateUrl: 'modules/events/index.html',
                controller:'EventsController as vm'
            })

            .state('events.list', {
                url: '/list',
                templateUrl: 'modules/events/views/events/list.html',
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

    }



}());


