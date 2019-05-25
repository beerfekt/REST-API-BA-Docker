(function () {
    "use strict";

    angular
        .module('app.admin')
        .factory('AdminUserFactory', AdminUserFactory);

    
    /** @ngInject */
    function  AdminUserFactory($http) {


        function AdminUser(userData) {
            if (userData) {
                this.setData(userData);
            }
        };

        //AdminUser Objekt
        AdminUser.prototype = {

            setData: function (userData) {
                angular.extend(this, userData);
            },

            create: function(){
                return $http({
                    method: "POST",
                    url: 'http://docker-backend.test/api/admin/users',
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
                    url: "http://docker-backend.test/api/users/" + id
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
                    url: 'http://docker-backend.test/api/admin/users/' + id,
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
                    url: 'http://docker-backend.test/api/admin/users/' + this.id,
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

            loadAll: function(){
                var scope = this;
                return $http({
                    method: "GET",
                    url: "http://docker-backend.test/api/users"
                }).then(function mySuccess(response) {
                    scope.users = response.data;
                    return response.data;
                }, function myError(response) {
                    throw response;
                });
            }

        };

        return AdminUser;
    }

}());