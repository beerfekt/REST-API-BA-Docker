(function () {
    "use strict";

    //module
    angular
        .module('app.admin',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('admin');

        $stateProvider

            .state('admin', {
                url: '/admin',
                templateUrl: 'modules/admin/home/index.html',
                controller: 'Admin.HomeController as vm'
            })
        /*
                    .state('admin.events', {
                        url: '/events',
                        templateUrl: 'modules/admin/events/index.html',
                        controller:'Admin.EventsController as vm'
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