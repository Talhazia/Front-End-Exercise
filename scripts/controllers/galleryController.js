'use strict';

angular.module('myApp.controllers', [])

.controller('galleryController', ['apiData', '$scope', '$timeout', '$mdDialog', function(apiData, $scope, $timeout, $mdDialog) {
    console.log("galleryController loeaded");
    $scope.photos= [];
    $scope.selectedSize = 'b';
    $scope.currentPage = 1;

    $scope.$watch('photos', function(){
      apiData.getData($scope.currentPage).then(function(data) {
        if(data.status === 200) {
          if(data.data.stat == "ok") {
            var photoObj = data.data.photos;
            $scope.pageNumbers = data.data.photos.pages;
            $scope.photos = photoObj.photo;
          }
        }
      });
    });

    $scope.goNext = function() {
      if($scope.currentPage < $scope.pageNumbers){
        $scope.currentPage = $scope.currentPage + 1;
      }
    }

    $scope.goBack = function() {
      if($scope.currentPage != 1){
        $scope.currentPage = $scope.currentPage - 1;
      }
    }

    $scope.openImage = function(photo, ev) {
      //console.log(photo);
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/photoDetails.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals:{dataToPass: photo},
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function() {
        });
    }

    function DialogController($scope, $mdDialog, dataToPass) {

        $scope._photo = dataToPass;
        $scope.selectedSize = 'b';
        $scope.sizeExists = false;
        apiData.getSize(dataToPass.id).then(function(response){

          if(response.status === 200) {
            if(response.data.stat == "ok") {
              var sizeObj = response.data.sizes;
              $scope.sizes = sizeObj.size;
              //console.log(scope.sizes);
            }
          }
        });

        $scope.changeImage = function() {
          $scope.sizeExists = true;
          $scope.newImage = 'http://farm' + $scope._photo.farm + '.staticflickr.com/' + $scope._photo.server +'/' + $scope._photo.id + '_' + $scope._photo.secret + '_' + apiData.convertToImgCode($scope.selectedSize.label) + '.jpg';
        }

         $scope.hide = function() {
           $mdDialog.hide();
         };

         $scope.cancel = function() {
           $mdDialog.cancel();
         };

         //$scope.image = dataToPass;
         //$scope.image = 'http://farm' + $scope._photo.farm + '.staticflickr.com/' + $scope._photo.server +'/' + $scope._photo.id + '_' + $scope._photo.secret + '_t.jpg';
         //console.log($scope._photo.title);
       }

}])
