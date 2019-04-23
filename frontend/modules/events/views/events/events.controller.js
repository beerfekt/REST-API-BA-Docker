//TODO: AJAX erfüllt? Was macht promise von Jonas


//TODO: Event Modell ändern in Title, Description, Date
//TODO: Bilder hochladen für Event


    'use strict';

    angular
        .module('app')
        .controller('EventsController', EventsController);

    /** @ngInject */
    function EventsController($state, $scope, $http){
        var vm = this;

        vm.goHome = goHome;
        vm.createNewEvent = createNewEvent;
        vm.showEvents = showEvents;
        vm.showEventDetails = showEventDetails;
        vm.addEvent = addEvent;
        vm.searchEvent = searchEvent;


        //Go to home
        function goHome(){
            $state.go('home');
        }

        //Go to add some events
        function createNewEvent(){
            $state.go('events.create');
        }


        function showEvents(){
                $http({
                    method : "GET",
                    url : "http://rest-backend.test/api/events/list"
                }).then(function mySuccess(response) {
                    console.log('receive data');
                    $scope.events = response.data;
                    }, function myError(response) {
                    $scope.events = [{"title":"keine Events vorhanden!"}];
                });
        }

        //TODO
        //Click Detail of Event
        function showEventDetails($eventId){
            $http({
                method : "GET",
                url : "http://rest-backend.test/api/events/list/" + $eventId
            }).then(function mySuccess(response) {
                $scope.event = response.data;
            }, function myError(response) {
                $scope.event = [{"title":"keine Eventbeschreibung verfügbar!"},{"description":""}];
            });
        }

        //Click Detail of Event
        function addEvent($title, $description, $startDateString, $endDateString){
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/events

            //TODO: POST -formdaten abgreifen und in form bringen:
            var data = {
                "title"       : $title,
                "description" : $description,
                "startDate"   : convertDateStringToSeconds($startDateString),
                "endDate"     : convertDateStringToSeconds($endDateString)
            };

            console.log(JSON.stringify(data));

            $http({
                method : "POST",
                url : 'http://rest-backend.test/api/events',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : data
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

        //TODO: DOKU: 1. Versuch mit im Frontend, dann 2. Versuch mit logik im Backend + DOKUMENTIEREN!
        //TODO: Suche nicht im Frontend, sondern im Backend!
        //TODO: Aufschreiben in Doku von : 1. Versuch: Suche im Frontend, 2.Versuch: SUche im Backend, und warum!


        function convertDateStringToSeconds ($dateAsString){
            var parts =$dateAsString.split('.');
            var date =  new Date(parts[2], parts[1]-1, parts[0]);
            //seconds
            return date.getTime();
        }


        function searchEvent(){

            //TODO: aus alle holen..
            //TODO: neue get url api/events/search/+$searchstring   ??? mal sehen
            $http({
                method : "GET",
                url : "http://rest-backend.test/api/events/list"
            }).then(function mySuccess(response) {
                $scope.events = response.data;
            }, function myError(response) {
                $scope.events = [{"title":"keine Events vorhanden!"}];
            });


            //TODO: dann suche auslesn

            //For every item ...
            $scope.sucheEigen = function (item) {

                if( $scope.searchText == undefined){
                    //if we have nothing in textbox
                    // display all elements (true foreach)
                    return true;
                } else {
                    //if we have something in the textbox
                    if ( item.city.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                        item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1
                    ) {
                        //display current element
                        return true;
                    }
                }
                //if nothing matches, return false and do not display the current item
                return false;

            }
        }






    }






/*


//TOGGLE Articles -> copy this and change the list.html view

function ArticlesController($state, $scope, $http){
    var vm = this;

    //Schalter
    var visible = false;
    $scope.articleButt = 'ListArticles';

    vm.goHome = goHome;
    vm.showEvents = showEvents;
    vm.showArticleDetails = showArticleDetails;

    //Go to home
    function goHome(){
        $state.go('home');
    }

    function showEvents(){
        if(!visible) {
            $http({
                method : "GET",
                url : "http://rest-tutorial.test/api/articles/list"
            }).then(function mySuccess(response) {
                $scope.articles = response.data;
                $scope.articleButt = 'hideArticles';
            }, function myError(response) {
                $scope.articles = [{"title":"keine Artikel vorhanden!"}];
            });
            visible = true;
        } else {
            $scope.article = "";
            $scope.articles = "";
            $scope.articleButt = 'showEvents';
            visible = false;
        }
        $scope.visibility  = visible;
    }


    //Click Detail of Article
    function showArticleDetails($articleId){
        if (!visible) return ;
        let urlString = "http://rest-tutorial.test/api/articles/list/" + $articleId;
        $http({
            method : "GET",
            url : urlString
        }).then(function mySuccess(response) {
            $scope.article = response.data;
        }, function myError(response) {
            $scope.article = [{"title":"keine Artikelbeschreibung verfügbar!"},{"content":""}];
        });
    }



};
*/
