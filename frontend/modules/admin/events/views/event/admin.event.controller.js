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
        vm.event = null;


        init();

        function init(){
            if (vm.currentEventId){
                let event = new AdminEventFactory();
                var promise = event.load(vm.currentEventId);
                promise.then(function(data) {
                    event.getData();
                    vm.event = data;
                    vm.event.startDate = formatUTCDate(vm.event.startDate);
                    vm.event.endDate = formatUTCDate(vm.event.endDate);
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


        function editEvent() {
            //let eventJSON = createData(vm.currentEventId, $title, $description, $startDateString,$endDateString);
            //console.log(eventJSON);



            if (parseInt(vm.event.startDate) > parseInt(vm.event.endDate)) {
                toaster.pop('error', 'Falsche Datumseingabe', 'Startdatum muss vor dem Enddatum liegen!');
                return;
            }

            vm.event.startDate = convertDateStringToSeconds(vm.event.startDate);
            vm.event.endDate = convertDateStringToSeconds(vm.event.endDate);

            let event = new AdminEventFactory(vm.event);
            var promise = event.update();

            promise.then(function(data) {
                console.log("Editevent()" + data);
                $state.go('admin.events.done');
                messageService.setMessage('Veranstaltung: " ' + event.title + ' " erfolgreich geändert');
            });

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
            console.log(date.getTime() /1000);
            return date.getTime() / 1000;
        }


        function formatUTCDate(d)
        {
            let date = new Date(d)
            var dd = date.getDate();
            var mm = date.getMonth()+1;
            var yyyy = date.getFullYear();
            if(dd<10){dd='0'+dd}
            if(mm<10){mm='0'+mm};
            return d = dd+'.'+mm+'.'+yyyy
        }

    }

}());




