(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.HomeController', AdminHomeController);

    /** @ngInject */
    function AdminHomeController($state, $localStorage) {
        var vm = this;

        vm.goToEvents = goToEvents;

        vm.currentUser = $localStorage.currentUser;

        //Go to events
        function goToEvents() {
            //$state.go('admin.events');
        }
    }

}());