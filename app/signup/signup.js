'use strict';


angular
    .module('zippyGig')
    .controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$location', 'RegistrationService', 'AuthenticationService'];
function SignUpCtrl($location, RegistrationService, AuthenticationService) {
    var vm = this;

    vm.register = register;
    vm.login = login;

    (function initCtrl() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function register() {
        vm.dataLoading = true;
        RegistrationService.Register(vm.email, vm.password, function(response) {
            if (response.data.result) {
                //RegistrationService.SetCredentials(vm.email, response.data.data.token);
                $location.path('/signin');
            }
            else {
                /* errors flashing must have */
                vm.dataLoading = false;
            }
        })

    }

    function login() {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.email, vm.password, function(response) {
            if (response.data.result) {
                AuthenticationService.SetCredentials(vm.email, response.data.data.token);
                $location.path('/');
            }
            else {
                /* errors flashing must have */
                vm.dataLoading = false;
            }
        })

    }
}

//.controller('SignInCtrl', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
//    $scope.authenticate = function(){
//       authenticate($scope, $http).then(function(result) {
//           $scope.authToken = result;
//           $rootScope.authenticated = true;
//           $window.location.href = '#/home';
//       })
//    };
//    //var authToken = authenticate($scope, $http);
//    //authToken.then(function(result) {
//    //    console.log(result);
//    //    //$window.location.href = '#/home';
//    //})
//}]);

//function authenticate($scope, $http){
//    // forming authentication request
//    var request1 = {
//        url: 'http://127.0.0.1:5000/auth/token/',
//        method: "POST",
//        data: {
//            'email': $scope.email,
//            'password': $scope.password
//        }
//    };
//    // sending request
//    return $http(request1)
//        .then(
//        function success(response) {
//            $scope.token = response.data.data.token;
//            return response.data.data.token;
//        },
//        function error(response) {
//            console.log(response.data.error);
//        }
//    );
//}

//function sendProfileRequest($scope, $http, token) {
//    // get profile request
//    var request2 = {
//        url: 'http://127.0.0.1:5000/client/profile/',
//        method: 'GET',
//        headers: {
//            'Authorization': 'Token ' + token
//        }
//    };
//    // sending request
//    $http(request2)
//        .then(
//        function success(response) {
//            console.log('success: ', response)
//        },
//        function error(response) {
//            console.log('error: ', response)
//        }
//    )
//}
