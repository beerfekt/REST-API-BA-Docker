(function () {
    "use strict";
//module

    angular
        .module('app.admin')
        .factory('messageService', messageService);

    /** @ngInject */
    function messageService() {

        var savedMessage;

        function setMessage(message) {
            savedMessage = message;
        }

        function getMessage() {
            return savedMessage;
        }

        return {
            setMessage: setMessage,
            getMessage: getMessage,
        }

    }

}());