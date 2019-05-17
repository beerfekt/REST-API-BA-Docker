(function () {
    "use strict";
//module

    angular
        .module('app.admin')
        .factory('dataTransferService', dataTransferService);

    /** @ngInject */
    function dataTransferService() {

        var savedMessage;
        var savedEvent;

        function setMessage(message) {
            savedMessage = message;
        }

        function getMessage() {
            return savedMessage;
        }


        function setEvent(event) {
            savedEvent = event;
        }

        function getEvent() {
            return savedEvent;
        }

        return {

            setEvent: setEvent,
            getEvent: getEvent,
            setMessage: setMessage,
            getMessage: getMessage
        }

    }

}());