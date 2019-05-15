(function () {
    "use strict";

    angular
        .module('app.public')
        .controller('Public.HomeController', PublicHomeController);

    /** @ngInject */
    function PublicHomeController($state, $localStorage) {
        var vm = this;

        vm.goToEvents = goToEvents;

        vm.currentUser = $localStorage.currentUser;

        //Go to events
        function goToEvents() {
            $state.go('public.events');
        }
    }

}());