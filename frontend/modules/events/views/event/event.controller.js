(function () {
    "use strict";

    angular
        .module('app.events')
        .controller('EventController', EventController);


    /** @ngInject */
    function EventController($state, $scope, $http, toaster) {
        var vm = this;

        vm.addEvent = addEvent;
        vm.goToEvents = goToEvents;

        function addEvent($title, $description, $startDateString, $endDateString) {
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/events

            if (!$title || !$description || !$startDateString || !$endDateString) {
                toaster.pop('error', 'Fehlende Felder!', 'Bitte alle Felder ausfuellen!');
                return;
            }
                //TODO: Uhrzeit fehlt noch
                //TODO: Prüfung das Startdatum < Enddatum


            var $startDate = convertDateStringToSeconds($startDateString);
            var $endDate =  convertDateStringToSeconds($endDateString);

            if ($startDate > $endDate){
                toaster.pop('error', 'Falsche Datumeingabe', 'Startdatum muss vor dem Endsdatum liegen!');
                return;
            }


            var data = {
                    "title": $title,
                    "startDate": $startDate,
                    "endDate": $endDate,
                    "description": $description
            };

            console.log(JSON.stringify(data));

            $http({
                method: "POST",
                url: 'http://docker-backend.test/api/events',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function mySuccess() {
                toaster.pop('success', "title", 'Fortbildung erfolgreich eingetragen');
                goToEvents();
            }, function myError(response) {
                toaster.pop('error', "title", 'Fortbildung konnte nicht eingetragen werden');
                $scope.msg = "Service not Exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers;
            });
            // Möglichkeit eine aktuelle Ansicht der Artikeldetails
            // showEventDetails() (mit verzögerung, sodass Änderungen übernommen werden)
        }

        function goToEvents() {
            $state.go('events.list');
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





