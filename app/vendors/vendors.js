'use strict';


angular
    .module('zippyGig')
    .controller('VendorsCtrl', VendorsCtrl);
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
VendorsCtrl.$inject = ['$scope', '$http', '$location'];
//
function VendorsCtrl($scope, $http, $location) {
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
    console.log('location search:', $location.search());
    $scope.selectedJobType = $location.search().job_type;
    $scope.selectedStatus = $location.search().status;
    $scope.searchVendors = function() {
        $location.url("/vendors").search({job_type: $scope.selectedJobType, status:$scope.selectedStatus});
    };


    var jobTypeRequest = {
        url: 'http://127.0.0.1:5000/api/v1/client/job-types/',
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        }};
    $http(jobTypeRequest).then(function(response) {
        $scope.jobTypes = response.data.data.job_types
    });

    var vendorsRequest = {
        url: 'http://127.0.0.1:5000/api/v1/client/vendors/',
        params: {
            job_type: $location.search().job_type,
            status:$location.search().status
        },
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        }};
    $http(vendorsRequest)
        .then(function (response) {
            $scope.vendorsList = response.data.data;
        })
}