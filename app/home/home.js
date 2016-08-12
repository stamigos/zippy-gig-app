'use strict';


angular
    .module('zippyGig')
    .controller('HomeCtrl', HomeCtrl);
//    .directive('fileModel', ['$parse', function ($parse) {
//        return {
//            restrict: 'A',
//            link: function(scope, element, attrs) {
//                var model = $parse(attrs.fileModel);
//                var modelSetter = model.assign;
//
//                element.bind('change', function(){
//                    scope.$apply(function(){
//                        modelSetter(scope, element[0].files[0]);
//                    });
//                });
//            }
//        };
//    }])
//    .service('fileUpload', ['$http', function ($http) {
//        this.uploadFileToUrl = function(file, uploadUrl){
//            var fd = new FormData();
//            fd.append('avatar', file);
//
//            $http.post(uploadUrl, fd, {
//                transformRequest: angular.identity,
//                headers: {'Content-Type': undefined}
//            })
//
//                .success(function(){
//                })
//
//                .error(function(){
//                });
//        }
//    }]);
//
HomeCtrl.$inject = ['$scope', '$http'];
//
function HomeCtrl($scope, $http) {
//    $scope.uploadFile = function(){
//        var file = $scope.myFile;
//
//        console.log('file is ' );
//        console.dir(file);
//
//        var uploadUrl = "http://127.0.0.1:5000/client/fileUpload";
//        console.log('fileUpload:', fileUpload)
//        fileUpload.uploadFileToUrl(file, uploadUrl);
//    };
    var request = {
        url: 'http://212.24.111.125/api/v1/client/vendors/',
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        }};
    $http(request)
        .then(function (response) {
            $scope.vendorsList = response.data.data;
        })
}