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

            .state('admin.events', {
                url: '/events',
                templateUrl: 'modules/admin/events/index.html',
                controller:'Admin.EventsController as vm'
            })

            .state('admin.events.list', {
                 url: '/list',
                 templateUrl: 'modules/admin/events/views/events/list.html',
                 controller:'Admin.EventsController as vm'
            })

            .state('admin.events.create', {
                 url: '/create',
                 templateUrl: 'modules/admin/events/views/event/create.html',
                 controller:'Admin.EventController as vm'
            })

            .state('admin.events.done', {
                url: '/create',
                templateUrl: 'modules/admin/events/views/event/done.html',
                controller:'Admin.EventController as vm'
            })


    } //config

}());