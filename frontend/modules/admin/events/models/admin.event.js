(function () {
    "use strict";


    //TODO: Wo kommt id her???
    angular
        .module('app.admin')
        .factory('AdminEventFactory', AdminEventFactory);


    /** @ngInject */
    function  AdminEventFactory($http) {

        //Offen für alles, falls event sich ändert, erweitert wird etc... daher generischer Konstruktor ohne fest definierte Werte
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
/*
            delete: function () {
                return $http({
                    method: "DELETE",
                    url: 'http://docker-backend.test/api/admin/events/' + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function mySuccess() {
                    return true;
                }, function myError(response) {
                    throw response;
                });
            },
*/
            update: function () {

                console.log(this + " \n" + this.id);

                return $http({
                    method: "PUT",
                    url: 'http://docker-backend.test/api/admin/events/' + this.id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this
                }).then(function mySuccess(response) {
                    scope.setData(response.data);
                    return response.data
                }, function myError(response) {
                    console.log(response);
                    throw response;
                });

                /*
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
                */
            },

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
            },

            getData: function (){
                console.log(this);
                //return this.data;
            }

        };

        return AdminEvent;
    }

}());