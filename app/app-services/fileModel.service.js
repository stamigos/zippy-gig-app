'use strict';

angular
    .module('zippyGig')
    .factory('FileModelService', FileModelService);

FileModelService.$inject = ['$http'];

function FileModelService($http) {
    this.uploadFileToUrl = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('file', file);

        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

            .success(function(response){
                callback(response)
            })

            .error(function(){
            });
    }
}