//'use strict';
//
//// Declare app level module which depends on views, and components
//angular.module('zippyGig', [
//  'ngRoute',
//  'zippyGig.home',
//  'zippyGig.signin',
//  'zippyGig.signup'
//]).
//config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
//      //$httpProvider.defaults.useXDomain = true;
//      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
//      $routeProvider.otherwise({redirectTo: '/home'});
//}]);

'use strict';

angular
    .module('zippyGig', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/vendors', {
            controller: 'VendorsCtrl',
            templateUrl: 'vendors/vendors.html',
            controllerAs: 'vm',
        })

        .when('/signin', {
            controller: 'SignInCtrl',
            templateUrl: 'signin/signin.html',
            controllerAs: 'vm'
        })

        .when('/signup', {
            controller: 'SignUpCtrl',
            templateUrl: 'signup/signup.html',
            controllerAs: 'vm'
        })

        .when('/logout', {
            template: '', // A template or templateUrl is required by AngularJS, even if your controller always redirects.
            controller: 'LogoutCtrl'
        })

        .when('/profile', {
            controller: 'ProfileCtrl',
            templateUrl: 'profile/profile.html',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/signin' });
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Token ' + $rootScope.globals.currentUser.token; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/signin', '/signup', '/vendors']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/signin');
        }
    });
}