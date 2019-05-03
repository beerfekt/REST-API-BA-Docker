(function () {
    "use strict";
//module

    angular
        .module('app.events')
        .factory('myService', myService);

    /** @ngInject */
    function myService() {

        var savedData = {}

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    }

}());