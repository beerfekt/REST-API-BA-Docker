(function () {
    "use strict";
//module

    angular
        .module('app.events', [])
        .factory('toastService', toastService);

    /** @ngInject */
    function toastService(toaster) {

        function missingFields() {
            toaster.pop('error', 'Fehlende Felder!', 'Bitte alle Felder ausfuellen!');
        }
/*
        function removed() {
            $mdToast.show({
                hideDelay: 3000,
                position: 'bottom right',
                templateUrl: 'app/toast/toast-removed.html'
            });
        }
*/

        return {
            missngFields: missingFields/*,
            removed: removed*/
        };
    }

}());