'use strict';

angular
    .module('zippyGig')
    .factory('RegistrationService', RegistrationService);
RegistrationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];

function RegistrationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Register = Register;
    //service.SetCredentials = SetCredentials;
    //service.ClearCredentials = ClearCredentials;

    return service;

    function Register(email, password, callback) {
        // forming registration request
        var request = {
            url: 'http://127.0.0.1:5000/api/v1/auth/signup/',
            method: "POST",
            data: {
                'email': email,
                'password': password
            },
            headers: {
                "Content-type": "application/json"
            }
        };
        // sending request
        return $http(request)
            .then(
            function success(response) {
                console.log(response)
                callback(response)
            }
        );
    }
    //function SetCredentials(email, token) {
    //
    //    $rootScope.globals = {
    //        currentUser: {
    //            email: email,
    //            token: token
    //        }
    //    };
    //
    //    $http.defaults.headers.common['Authorization'] = 'Token ' + token;
    //    $cookieStore.put('globals', $rootScope.globals);
    //}
    //function ClearCredentials() {
    //    $rootScope.globals = {};
    //    $cookieStore.remove('globals');
    //    $http.defaults.headers.common.Authorization = 'Token';
    //}
}