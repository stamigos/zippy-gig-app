'use strict';


angular
    .module('zippyGig')
    .controller('LogoutCtrl', LogoutCtrl);

LogoutCtrl.$inject = ['$location', '$rootScope', '$cookieStore', '$http'];

function LogoutCtrl($location, $rootScope, $cookieStore, $http) {
    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Token';
    $location.path('/signin');
}