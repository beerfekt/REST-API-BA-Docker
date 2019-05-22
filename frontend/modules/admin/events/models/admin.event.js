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

            create: function(){
                return $http({
                    method: "POST",
                    url: 'http://docker-backend.test/api/admin/events',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this
                }).then(function mySuccess(response) {
                    return response.data;
                }, function myError(response) {
                    throw response;
                });
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

            delete: function (id) {
                return $http({
                    method: "DELETE",
                    url: 'http://docker-backend.test/api/admin/events/' + id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function mySuccess(response) {
                    return response.data;
                }, function myError(response) {
                    throw response;
                });
            },

            update: function () {
                var scope = this;
                return $http({
                    method: "PUT",
                    url: 'http://docker-backend.test/api/admin/events/' + this.id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this
                }).then(function mySuccess(response) {
                    scope.setData(response.data);
                    return response.data;
                }, function myError(response) {
                    throw response;
                });
            },

            //TODO: DOKU nicht gut weil festgefahren
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
            //TODO : -------------------

            //TODO: DOKU besser da generisch
            getData: function (){
                return this.data;
            }

        };

        return AdminEvent;
    }

}());