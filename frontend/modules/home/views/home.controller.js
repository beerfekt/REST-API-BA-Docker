'use strict';

angular
    .module('app')
    .controller('HomeController', HomeController);

/** @ngInject */
function HomeController($state){
    var vm = this;

    vm.goToEvents=goToEvents;

    //Go to courses
    function goToEvents(){
        $state.go('events');
    }

};