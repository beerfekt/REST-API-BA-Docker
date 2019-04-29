//TODO: AJAX erfüllt? Was macht promise von Jonas


//TODO: Event Modell ändern in Title, Description, Date
//TODO: Bilder hochladen für Event

(function () {
    "use strict";

    angular
        .module('app.events')
        .controller('EventsController', EventsController);

    /** @ngInject */
    function EventsController($state, $scope, $http) {
        var vm = this;

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
            $http({
                method: "GET",
                url: "http://docker-backend.test/api/events/list"
            }).then(function mySuccess(response) {
                console.log('receive data');
                $scope.events = response.data;
            }, function myError(response) {
                $scope.events = [{"title": "keine Events vorhanden!"}];
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