'use strict';

var directives = angular.module('api.directives', []);

directives.directive('displayPhoto', function($compile, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "templates/photos.html",
    scope: {
      photo: '='
    },
    link: function(scope, elem, attrs) {
      scope.$watch('photo', function(_photo) {
        if(_photo) {
          scope.imgSource = 'http://farm' + _photo.farm + '.staticflickr.com/' + _photo.server +'/' + _photo.id + '_' + _photo.secret + '_t.jpg';
        }
      });
    }
  }
});
