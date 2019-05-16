//TODO: Bilder hochladen für Event

(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.EventsController', AdminEventsController);

    /** @ngInject */
    function AdminEventsController($state, $scope, $http, $localStorage) {
        var vm = this;

        vm.currentUser = $localStorage.currentUser;

        vm.goHome = goHome;
        vm.createNewEvent = createNewEvent;
        vm.showEvents = showEvents;
        vm.toggleIcon = toggleIcon;

        //Wenn State aufgerufen wird, wird diese Funktion ausgeführt,
        //andere Funktionen werden nur spezifisch aufgerufen
        init();

        function init(){
            showEvents();
        }

        function showEvents() {
            /*
            console.log('show Events');

            console.log($localStorage.currentUser);
            */
            $http({
                method: "GET",
                url: "http://docker-backend.test/api/events/list"
            }).then(function mySuccess(response) {
                console.log('receive data');
                $scope.events = response.data;
                console.log(response.data);
            }, function myError(response) {
                console.log(response);
                $scope.error = "Keine Events vorhanden!";
            });
        }//showEvents()

        function toggleIcon($elementID) {
            $scope.expandedValue = !$scope.expandedValue; //Wert abgreifen und Rückschreiben in Scope
            let switcher = $scope.expandedValue;
            let icon = document.getElementById('icon' + $elementID);
            let elementToShow = document.getElementById('collapse' + $elementID);
            if (elementToShow.className == "collapse show" && icon.className == 'fa fa-minus') {
                icon.className = 'fa fa-plus';
            } else {
                icon.className = 'fa fa-minus';
            }
        }//toggleIcon

        //Go to home
        function goHome() {
            $state.go('home');
        }

        //Go to add some events
        function createNewEvent() {
            $state.go('events.create');
        }
    }

}());