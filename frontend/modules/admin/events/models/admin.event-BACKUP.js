(function () {
    "use strict";


    //TODO: Wo kommt id her???
    angular
        .module('app.admin')
        .factory('AdminEventFactory', AdminEventFactory);


    /** @ngInject */
    function  AdminEventFactory($http) {

        function AdminEvent(eventData) {
            if (eventData) {
                this.eventData(eventData);
            }
        };

        //AdminEvent Objekt
        AdminEvent.prototype = {

            setData: function (eventData) {
                angular.extend(this, eventData);
            },

            load: function (id) {
                var scope = this;

                $http({
                    method: "GET",
                    url: "http://docker-backend.test/api/events/" + id
                }).then(function mySuccess(response) {
                    console.log('AdminEvent-Model: receive data');
                    scope.setData(response.data);
                    console.log('AdminEvent-Model: ' + response.data["title"]);
                }, function myError(response) {
                    console.log(response);
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

            getTitle: function(){
                return this.eventData;
            }

        };


        return AdminEvent;


    }






}());