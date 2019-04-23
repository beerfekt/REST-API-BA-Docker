'use strict';


//module

angular
    .module('app.home', ['ui.router'])
    .config(config)
/*
    .run(function(){
        console.log('myApp is ready!');
    });
*/

//Configuration of module
/** @ngInject */
function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/home/views/index.html',
            controller: 'HomeController as vm'
        })

};