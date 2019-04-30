(function () {
    "use strict";

    //why do use (function 'use-strict')
    //https://stackoverflow.com/questions/12957625/angularjs-controllers-and-use-strict

    //module
    angular
        .module('app', [

            //libraries
            'ui.router',
            'angularUtils.directives.dirPagination',
            'ngAnimate',
            'toaster',


            //modules
            'app.events',
            'app.home'
        ])

}());



