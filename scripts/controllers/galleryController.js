'use strict';

angular.module('myApp.controllers', [])

.controller('galleryController', ['apiData', '$scope', function(apiData, $scope) {
    console.log("galleryController loeaded");
    $scope.photos = {};

    $scope.$watch('photos', function(){
      apiData.getData(1).then(function(data) {
        if(data.status === 200) {
          if(data.data.stat == "ok") {
            var photoObj = data.data.photos;
            $scope.photos = photoObj.photo;
          }
        }
      });
    });

}]);
