//TODO: Bilder hochladen für Event

(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.UsersController', AdminUsersController);

    /** @ngInject */
    function AdminUsersController($state, $scope, $http, $localStorage, toaster, AdminUserFactory) {
        var vm = this;

        vm.currentUser = $localStorage.currentUser;
        vm.users = null;

        vm.goHome = goHome;
        vm.createNewUser = createNewUser;
        vm.removeUser = removeUser;
        vm.loadUsers = loadUsers;
        vm.toggleIcon = toggleIcon;
        vm.editUser = editUser;

        init();

        function init(){
            loadUsers();
        }

        function loadUsers() {
            let user = new AdminUserFactory();
            let promise = user.loadAll();
            promise.then(function(data){
                vm.users = data;
            });
        }//showUsers()

        function removeUser($userId, $userName){
            let user = new AdminUserFactory();
            let promise = user.delete($userId);
            promise.then(function(data){
                toaster.pop('success','Erfolgreich entfernt!','Nutzer : " ' + $userName + ' " wurde erfolgreich entfernt');
                setTimeout(loadUsers(), 3000);
            });
        }

        function toggleIcon($elementID) {
            $scope.expandedValue = !$scope.expandedValue; //Wert abgreifen und Rückschreiben in Scope
            let icon = document.getElementById('icon' + $elementID);
            let elementToShow = document.getElementById('collapse' + $elementID);
            if (elementToShow.className == "collapse show" && icon.className == 'fa fa-minus') {
                icon.className = 'fa fa-plus';
            } else {
                icon.className = 'fa fa-minus';
            }
        }//toggleIcon

        //Go to home
        function goHome() {
            $state.go('home');
        }

        //Go to add some users
        function createNewUser() {
            $state.go('admin.users.create');
        }

        //Go to add some users
        function editUser($userId) {
            $state.go('admin.users.edit', {userId : $userId});

        }

    }

}());