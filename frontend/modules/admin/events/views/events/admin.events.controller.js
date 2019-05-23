//TODO: Bilder hochladen für Event

(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.EventsController', AdminEventsController);

    /** @ngInject */
    function AdminEventsController($state, $scope, $http, $localStorage, toaster, AdminEventFactory) {
        var vm = this;

        vm.currentUser = $localStorage.currentUser;

        vm.goHome = goHome;
        vm.createNewEvent = createNewEvent;
        vm.removeEvent = removeEvent;
        vm.showEvents = showEvents;
        vm.toggleIcon = toggleIcon;
        vm.editEvent = editEvent;

        //Wenn State aufgerufen wird, wird diese Funktion ausgeführt,
        //andere Funktionen werden nur spezifisch aufgerufen

        //TODO: Besser init() weglassen, da es auch bei substates "/events/*" jedesmal lädt
        init();

        function init(){
            showEvents();
        }

        function showEvents() {
            $http({
                method: "GET",
                url: "http://docker-backend.test/api/events"
            }).then(function mySuccess(response) {
                console.log('receive data');
                $scope.events = response.data;
                console.log(response.data);
            }, function myError(response) {
                console.log(response);
                $scope.error = "Keine Events vorhanden!";
            });
        }//showEvents()

        function removeEvent($eventId, $eventTitle){
            let event = new AdminEventFactory();
            let promise = event.delete($eventId);
            promise.then(function(data){
                toaster.pop('success','Erfolgreich entfernt!','Veranstaltung: " ' + $eventTitle + ' " wurde erfolgreich gelöscht');
                setTimeout(showEvents(), 3000);
            });
        }

        function toggleIcon($elementID) {
            $scope.expandedValue = !$scope.expandedValue; //Wert abgreifen und Rückschreiben in Scope
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

        //Go to add some events
        function editEvent($eventId) {
            $state.go('admin.events.edit', {eventId : $eventId});

        }

    }

}());