
'use strict';

angular
    .module('app.events')
    .controller('EventController', EventController);


/** @ngInject */
function EventController($state, $scope, $http) {
    var vm = this;

    vm.createNewEvent = createNewEvent;

    //Go to add some events
    function createNewEvent(){
        console.log('eventController.createNewEvent');
        $state.go('events.event.create');
    }



}