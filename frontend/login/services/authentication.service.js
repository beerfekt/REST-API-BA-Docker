(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;


        //curl -X POST -H "Content-Type: application/json" http://docker-backend.test/api/login_check -d '{"username":"admin@admin.com","password":"1111"}'
        function Login(username, password, callback) {

            var data = {
                "username": username,
                "password": password
            };

            $http({
                method: "POST",
                url: 'http://docker-backend.test/api/login_check',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data

            }).then(function mySuccess(response) {

                console.log('logged in - succes \n' + ' Token: ' + response.data.token );
                // login successful if there's a token in the response
                if (response.data.token) {
                    //TODO: Durchloggen!! WIe speicher man token und klatscht es in den header bei requests?
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.data.token };
                    console.log($localStorage.currentUser);
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }

            }, function myError(response) {

                console.log('logged in ERROR');

            });

        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }

        function getCurrentUser(){
            return $localStorage.currentUser;
        }
/*
        $rootScope.isSessionActive = function () {
            return $localStorage.currentUser ? true : false;
        }
*/
    }
})();