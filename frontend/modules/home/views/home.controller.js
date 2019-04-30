(function () {
    "use strict";

    angular
        .module('app')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($state) {
        var vm = this;

        vm.goToEvents = goToEvents;

        //Go to events
        function goToEvents() {
            $state.go('events.list');
        }
    }

}());