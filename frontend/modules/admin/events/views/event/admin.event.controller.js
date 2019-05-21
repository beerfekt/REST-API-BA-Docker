(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.EventController', AdminEventController);


    /** @ngInject */
    function AdminEventController($state, $scope, $http, toaster, messageService, AdminEventFactory) {
        var vm = this;

        vm.addEvent = addEvent;
        vm.editEvent = editEvent;
        vm.goToEvents = goToEvents;

        vm.messageService = messageService;
        vm.currentEventId = $state.params.eventId;

        init();

        function init(){
            console.log("init():");
            if (vm.currentEventId){
                let event = new AdminEventFactory();
                var promise = event.load(vm.currentEventId);
                promise.then(function(data) {
                    event.getData();
                    $scope.event = data;
                });
            }
        }


        function addEvent($title, $description, $startDateString, $endDateString) {
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/events

            if (!$title || !$description || !$startDateString || !$endDateString) {
                toaster.pop('error', 'title', 'Bitte alle Felder ausfuellen!');
                return;
            }

            if (parseInt($startDateString) > parseInt($endDateString)) {
                toaster.pop('error', 'title', 'Startdatum muss vor dem Enddatum liegen!');
                return;
            }

            //TODO: Uhrzeit fehlt noch

            var data = {
                "title": $title,
                "startDate": convertDateStringToSeconds($startDateString),
                "endDate": convertDateStringToSeconds($endDateString),
                "description": $description
            };

            console.log(JSON.stringify(data));

            //TODO: http methode in model admin.event auslagern?
            $http({
                method: "POST",
                url: 'http://docker-backend.test/api/admin/events',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function mySuccess() {
                //toaster.pop('success', "title", 'Fortbildung erfolgreich eingetragen');
                messageService.setMessage('Veranstaltung: " ' + $title + ' " erfolgreich eingetragen');
                $state.go('admin.events.done');
            }, function myError(response) {
                toaster.pop('error', "title", 'Fortbildung konnte nicht eingetragen werden');
            });
            // Möglichkeit eine aktuelle Ansicht der Artikeldetails
            // showEventDetails() (mit verzögerung, sodass Änderungen übernommen werden)
        }


        function editEvent($title, $description, $startDateString,$endDateString) {

            let eventJSON = createData(vm.currentEventId, $title, $description, $startDateString,$endDateString);
            console.log(eventJSON);

            let event = new AdminEventFactory(eventJSON);
            var promise = event.update();
            /*
            promise.then(function(data) {
                console.log("Editevent()" + data);
            });
            */

        }


        function  createData($id, $title, $description, $startDateString,$endDateString){
            return {
                "id" : $id,
                "title": $title,
                "startDate": convertDateStringToSeconds($startDateString),
                "endDate": convertDateStringToSeconds($endDateString),
                "description": $description
            };
        }

        function goToEvents() {
            $state.go('admin.events.list');
        }


        function convertDateStringToSeconds($dateAsString) {
            if (!$dateAsString) return;

            var parts = $dateAsString.split('.');
            var date = new Date(parts[2], parts[1] - 1, parts[0]);
            //seconds
            return date.getTime() / 1000;
        }


    }

}());




