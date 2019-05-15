(function () {
    "use strict";

    //module
    angular
        .module('app.admin',[])
        .config(config)

    //Configuration of module
    /** @ngInject */
    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('admin.home');

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'modules/admin/index.html',
                controller: 'Admin.HomeController as vm'
            })

            .state('admin.home', {
                url: '/home',
                templateUrl: 'modules/admin/home/index.html',
                controller: 'Admin.HomeController as vm'
            })
        /*

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
        */

    } //config

}());