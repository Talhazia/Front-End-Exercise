'use strict';

var directives = angular.module('api.directives', []);

directives.directive('displayPhoto', function($compile, $timeout, apiData) {
  //console.log(apiData);
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "templates/photos.html",
    scope: {
      photo: '='
    },
    link: function(scope, elem, attrs) {
      scope.$watchGroup(['photo'], function(newValues, oldValues, scope) {
        if(newValues[0]) {
          var _photo = newValues[0];
          scope.imgSource = 'http://farm' + _photo.farm + '.staticflickr.com/' + _photo.server +'/' + _photo.id + '_' + _photo.secret + '_t.jpg';
        }
        /*if(newValues[1] && newValues[0]) {
          apiData.getSize(newValues[1].id).then(function(response){
            if(response.status === 200) {
              if(response.data.stat == "ok") {
                var sizeObj = response.data.sizes;
                scope.sizes = sizeObj.size;
                console.log(scope.sizes);
                //console.log(scope.sizes);
              }
            }
          })
        }*/
      })
      /*scope.$watch('photo', function(_photo) {
        if(_photo) {
          apiData.getSize(_photo.id).then(function(response){
            if(response.status === 200) {
              if(response.data.stat == "ok") {
                var sizeObj = response.data.sizes;
                //scope.sizes = sizeObj.size;
                //console.log(scope.sizes);
              }
            }
          })

          scope.imgSource = 'http://farm' + _photo.farm + '.staticflickr.com/' + _photo.server +'/' + _photo.id + '_' + _photo.secret + '_t.jpg';
          scope.sizes = "test";
          console.log(scope.sizes);
        }
      });*/
    }
  }
});
