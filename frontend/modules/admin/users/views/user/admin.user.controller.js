(function () {
    "use strict";

    angular
        .module('app.admin')
        .controller('Admin.UserController', AdminUserController);


    /** @ngInject */
    function AdminUserController($state, $scope, $http, toaster, messageService, AdminUserFactory, ) {
        var vm = this;

        vm.messageService = messageService;
        vm.users = loadAllUsers();
        vm.user = loadCurrentUser();

        vm.addUser = addUser;
        vm.editUser = editUser;
        vm.goToUsers = goToUsers;
        vm.comparePasswords = comparePasswords;
        vm.validateName =  validateName;
        vm.validateEmail = validateEmail;

        //init()  {}
        init();

        function init(){}

        //load all users
        function loadAllUsers(){
            let userFactory = new AdminUserFactory();
            //alle user laden
            let promise = userFactory.loadAll();
            promise.then(function(data){
                vm.users = data;
                });
        }

        function loadCurrentUser(){
            let userFactory = new AdminUserFactory();
            //alle user laden
            if($state.params.userId){
                let promise = userFactory.load($state.params.userId);
                promise.then(function(data){
                    vm.user = data;
                    console.log(vm.user);
                });
            }
        }

        function addUser( $email, $firstName, /*$roles,*/ $password, $passwordRepeated ) {
            // curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "new Title", "content": "new Content"}' http://rest-tutorial.test/api/users

            if ( !( $email && $firstName && /*$roles,*/ $password && $passwordRepeated) ) {
                toaster.pop('error', 'adduser() - Fehlende Felder!', 'Bitte alle Felder ausfuellen!');
                return;
            }

            if ( !comparePasswords($password,$passwordRepeated) ) {
                toaster.pop('error', 'Passwoerter !', 'adduser() Passwoerter stimmen nicht ueberein!');
                return;
            }

            if ( validateEmail($email) && validateName($firstName) ) {
                return;
            }

            let data = {
                "email": $email,
                "firstName": $firstName,
                "roles" : ['ROLE_USER'],
                "password": $password,
            };
           // console.log(JSON.stringify(data));

            let user = new AdminUserFactory(data);
            let promise = user.create();
            promise.then(function(data){
                messageService.setMessage('Nutzer: " ' + user.firstName + ' " erfolgreich eingetragen');
                $state.go('admin.users.done');
            });
        }


        //TODO: FERTIGMACHEN und quatsch mit passwort überlegen
        function editUser($password, $passwordRepeated) {

            if (!$password){
                return;
            }

            if ( !comparePasswords($password,$passwordRepeated) ) {
                toaster.pop('error', 'Passwoerter !', 'adduser() Passwoerter stimmen nicht ueberein!');
                return;
            }

            if ( validateEmail(vm.user.email) && validateName(vm.user.firstName) ) {
                return;
            }

            let userData = {
                "id":  $state.params.userId,
                "email": vm.user.email,
                "firstName": vm.user.firstName,
                "roles" : ['ROLE_USER'],
                "password": $password,
            };

            let user = new AdminUserFactory(userData);
            let promise = user.update();
            promise.then(function(data) {
                $state.go('admin.users.done');
                messageService.setMessage('Nutzer: " ' + user.firstName + ' " erfolgreich editiert');
            });

        }

        function goToUsers() {
            $state.go('admin.users.list');
        }

        function validateName(name){
              for (var i = 0; i < vm.users.length; i++){
                  if ( vm.users[i].firstName == name)  {
                      toaster.pop('error', 'Name vergeben !', 'Bitte einen anderen Namen verwenden, dieser  ist bereits belegt!');
                      return false;
                  }
            }
        }

        function validateEmail(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(String(email).toLowerCase()) && compareEmail(email)){
                toaster.pop('error', 'Email vergeben !', 'Bitte eine andere Email verwenden, diese  ist bereits belegt!');
                return false;
            };
            return true;
        }

        function compareEmail(email){
            for (var i = 0; i < vm.users.length; i++){
                if (vm.users[i].email == email){
                    console.log('TRUE' + vm.users[i].email + "<-- -->" + email );
                    return true;
                }
            }
            return false;
        }

        function comparePasswords(password, passwordRepeated){
            if ( password == passwordRepeated ) {
                return true;
            } else {
                toaster.pop('error', 'Passwort !', 'Passwoerter stimmen nicht ueberein!');
                return false;
            }
        }

    }

}());




