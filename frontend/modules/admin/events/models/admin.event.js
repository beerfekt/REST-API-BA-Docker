(function () {
    "use strict";


    //TODO: Wo kommt id her???
    angular
        .module('app.admin')
        .factory('AdminEventFactory', AdminEvent);


    /** @ngInject */
    function  AdminEvent($http) {

        function AdminEvent(eventData) {
            if (eventData) {
                this.setData(eventData);
            }
        };

        //AdminEvent Objekt
        AdminEvent.prototype = {

            setData: function (eventData) {
                angular.extend(this, eventData);
            },

            load: function (id) {
                /*
                var scope = this;

                return $http({
                    method: "GET",
                    url: "http://docker-backend.test/api/events/" + id
                }).then(function mySuccess(response) {
   //                 console.log('AdminEvent-Model: receive data');
                    scope.setData(response.data);
                    return response.data;
  //                  console.log('AdminEvent-Model: ' + response.data["title"]);
                }, function myError(response) {
                    console.log(response);
                    throw response;
                });
                */

                var scope = this;
                return $http({
                    method: "GET",
                    url: "http://docker-backend.test/api/events/" + id
                }).then(function mySuccess(response) {
                    scope.setData(response.data);
                    return response.data
                }, function myError(response) {
                    console.log(response);
                    throw response;
                });
            },

            delete: function () {
                $http({
                    method: "DELETE",
                    url: 'http://docker-backend.test/api/admin/events/' + id,

                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function mySuccess() {
                    return true;
                }, function myError(response) {
                    return false;
                });
            },

            update: function () {
                $http({
                    method: "PUT",
                    url: 'http://docker-backend.test/api/admin/events/' + id,

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this
                }).then(function mySuccess() {
                    return true;
                }, function myError(response) {
                    return false;
                });
            },




            //TODO: wie variablen global in klasse machen????
            getTitle: function(){
                return this.title;
            },

            getDescription: function(){
                return this.description;
            },

            getStartDate: function(){
                return this.startDate;
            },

            getEndDate: function(){
                return this.endDate;
            }

        };


        return AdminEvent;


    }






}());