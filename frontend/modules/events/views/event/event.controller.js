(function () {
    "use strict";

    angular
        .module('app.events')
        .controller('EventController', EventController);


    /** @ngInject */
    function EventController($state, $scope, $http) {
        var vm = this;

        vm.addEvent = addEvent;

        function addEvent($title, $description, $startDateString, $endDateString) {
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/events

            //TODO: POST -formdaten abgreifen und in form bringen:
            var data = {
                "title": $title,
                "startDate": convertDateStringToSeconds($startDateString),
                "endDate": convertDateStringToSeconds($endDateString),
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
                $scope.msg = "Post Data Submitted Successfully!";
            }, function myError(response) {
                $scope.msg = "Service not Exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
                $scope.headers = response.headers;
            });
            // Möglichkeit eine aktuelle Ansicht der Artikeldetails
            // showEventDetails() (mit verzögerung, sodass Änderungen übernommen werden)
        }

        function convertDateStringToSeconds($dateAsString) {
            var parts = $dateAsString.split('.');
            var date = new Date(parts[2], parts[1] - 1, parts[0]);
            //seconds
            return date.getTime() / 1000;
        }


    }

}());





