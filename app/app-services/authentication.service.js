'use strict';

angular
    .module('zippyGig')
    .factory('AuthenticationService', AuthenticationService);
AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(email, password, callback) {
        // forming authentication request
        var request = {
            url: 'http://212.24.111.125/api/v1/auth/token/',
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
                callback(response)
            }
        );
    }
    function SetCredentials(email, token) {

        $rootScope.globals = {
            currentUser: {
                email: email,
                token: token
            },
            loggedIn: true
        };

        $http.defaults.headers.common['Authorization'] = 'Token ' + token;
        $cookieStore.put('globals', $rootScope.globals);
    }
    function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Token';
    }
}