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
                if (newValues[0]) {
                    var _photo = newValues[0];
                    scope.imgSource = 'http://farm' + _photo.farm + '.staticflickr.com/' + _photo.server + '/' + _photo.id + '_' + _photo.secret + '_t.jpg';
                }

            })

        }
    }
});
