(function () {
    "use strict";
//module

    angular
        .module('app.events')
        .factory('messageService', messageService);

    /** @ngInject */
    function messageService() {

        var savedData;

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