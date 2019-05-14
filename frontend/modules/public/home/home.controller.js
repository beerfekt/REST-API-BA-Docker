(function () {
    "use strict";

    angular
        .module('app.public')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($state, $localStorage) {
        var vm = this;

        vm.goToEvents = goToEvents;

        vm.currentUser = $localStorage.currentUser;

        //Go to events
        function goToEvents() {
            $state.go('events.list');
        }
    }

}());