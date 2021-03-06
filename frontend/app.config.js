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
            'ngStorage',

            //modules
            'app.public',
            'app.admin',

        ])

}());



