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
        vm.validateDates = validateDates;


        vm.messageService = messageService;
        vm.currentEventId = $state.params.eventId;
        vm.event = null;

        init();

        function init(){
            if (vm.currentEventId){
                let event = new AdminEventFactory();
                var promise = event.load(vm.currentEventId);
                promise.then(function(data) {
                    vm.event = data;
                    vm.event.startDate = formatUTCDate(vm.event.startDate);
                    vm.event.endDate = formatUTCDate(vm.event.endDate);
                });
            }
        }


        function addEvent($title, $description, $startDateString, $endDateString) {
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/events

            if (!$title || !$description || !$startDateString || !$endDateString) {
                toaster.pop('error', 'Fehlende Felder!', 'Bitte alle Felder ausfuellen!');
                return;
            }

            if (!validateDates($startDateString,$endDateString)) {
                return;
            }


            let data = {
                "title": $title,
                "startDate": convertDateStringToSeconds($startDateString),
                "endDate": convertDateStringToSeconds($endDateString),
                "description": $description
            };
           // console.log(JSON.stringify(data));

            let event = new AdminEventFactory(data);
            let promise = event.create();
            promise.then(function(data){
                messageService.setMessage('Veranstaltung: " ' + event.title + ' " erfolgreich eingetragen');
                $state.go('admin.events.done');
            });


            //TODO: http methode in model admin.event auslagern?
/*
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
            */
            // Möglichkeit eine aktuelle Ansicht der Artikeldetails
            // showEventDetails() (mit verzögerung, sodass Änderungen übernommen werden)
        }


        function editEvent() {

            if (!validateDates(vm.event.startDate, vm.event.endDate)) {
                return;
            }

            vm.event.startDate = convertDateStringToSeconds(vm.event.startDate);
            vm.event.endDate = convertDateStringToSeconds(vm.event.endDate);

            let event = new AdminEventFactory(vm.event);
            let promise = event.update();
            promise.then(function(data) {
                //console.log("Editevent()" + data);
                $state.go('admin.events.done');
                messageService.setMessage('Veranstaltung: " ' + event.title + ' " erfolgreich geändert');
            });

        }

        function goToEvents() {
            $state.go('admin.events.list');
        }

        function validateDates(startDateString, endDateString){
            if (startDateString && endDateString) {

                let startDateinSeconds = convertDateStringToSeconds(startDateString);
                let endDateinSeconds = convertDateStringToSeconds(endDateString);

                if (startDateinSeconds <= endDateinSeconds) {
                    return true;
                } else {
                    toaster.pop('error', 'Falsche Datumseingabe', 'Startdatum muss vor dem Enddatum liegen!');
                    return false;
                }
            }
            return false;
        }

        function convertDateStringToSeconds($dateAsString) {
            if (!$dateAsString) return;
            let parts = $dateAsString.split('.');
            let date = new Date(parts[2], parts[1] - 1, parts[0]);
            //compute seconds
            return date.getTime() / 1000;
        }

        function formatUTCDate(d)
        {
            let date = new Date(d)
            let dd = date.getDate();
            let mm = date.getMonth()+1;
            let yyyy = date.getFullYear();
            if(dd<10){dd='0'+dd}
            if(mm<10){mm='0'+mm};
            return d = dd+'.'+mm+'.'+yyyy
        }
    }

}());




