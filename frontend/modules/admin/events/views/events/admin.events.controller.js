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
            //TODO: ins admin.event model integrieren?
            /*
            console.log('show Events');
            console.log($localStorage.currentUser);
            */
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

            //toaster.pop('error', "title", 'Fortbildung " ' + $eventTitle +  ' " konnte nicht gelöscht werden');

/*
            $http({
                method: "DELETE",
                url: 'http://docker-backend.test/api/admin/events/' + $eventId,

                   headers: {
                       'Content-Type': 'application/json'
                   }
            }).then(function mySuccess() {
                toaster.pop('success','Erfolgreich entfernt!','Veranstaltung: " ' + $eventTitle + ' " wurde erfolgreich gelöscht');
                setTimeout(showEvents(), 3000);
            }, function myError(response) {
                toaster.pop('error', "title", 'Fortbildung " ' + $eventTitle +  ' " konnte nicht gelöscht werden');
            });
*/

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

            //console.log($eventId);
            $state.go('admin.events.edit', {eventId : $eventId});

            //TODO:       DOKU statt:
            /*
            var event = new AdminEventFactory();
           event.load($eventId);

            for(var key in event.setData) {
                if(event.setData.hasOwnProperty(key)) {
                    console.log(data[key]);
                }
            }
            console.log(event);

            event.getTitle();
*/

            //TODO:        DOKU das: Promise Ansatz
            /*
            var event = new AdminEventFactory();
            var promise = event.load($eventId);
            promise.then(function(data) {
                //console.log(data);
                //console.log(event);
                //console.log(event.getTitle() + event.getDescription() + event.getStartDate() + event.getEndDate()); //undefined

            });
            */
            //$scope.event = event;

            //TODO: Weiterreichen des events an edit.html whatever

            /*
            $http({
                method: "GET",
                url: "http://docker-backend.test/api/events/list/" + $eventId
            }).then(function mySuccess(response) {
                console.log('receive  event');
                //TODO: in event model/Service reinballern

                console.log(response.data);
            }, function myError(response) {
                console.log(response);
                $scope.error = "Keine Events vorhanden!";
            });

            $state.go('events.create');
            */
        }


    }

}());