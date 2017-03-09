'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'myApp.controllers',
        'ui.router',
        'ngMaterial',
        'api.service',
        'api.directives',
        'akoenig.deckgrid'
    ])
    .run(function() {

    })
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })

            .state('gallery', {
                url: '/gallery',
                templateUrl: 'templates/gallery.html',
                controller: 'galleryController'
            });

        $urlRouterProvider.otherwise('/home');
    }]);

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

'use strict';

angular.module('myApp.controllers')

.controller('HomeController', ['$scope', function($scope) {
    console.log("Home controller loaded");

    $scope.candidateName = "Talha Zia";
    $scope.hiringManager = "Dean Williams";
    $scope.position = "Front End Developer";

}]);

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

'use strict';

var services = angular.module('api.service', []);

services.factory('apiData', ['$http', function($http) {
  return {
     getData: function(page_num) {
          return $http.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&page=' + page_num);
     },
     getSize: function(photoID) {
       return $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&photo_id=' + photoID);
     },
     convertToImgCode: function(_string) {
       switch(_string) {

         case 'Large':
          return 'b';
         break;

         case 'Square':
          return 's';
         break;

         case 'Thumbnail':
          return 't';
         break;

         case 'Small':
          return 's';
         break;

         case 'Small 240':
          return 'm';
         break;

         case 'Small 320':
          return 'n';
         break;

         case 'Medium':
          return '-';
         break;

         case 'Medium 640':
          return 'z';
         break;

        case 'Medium 800':
         return 'c';
        break;

        case 'Large 1600':
         return 'h';
        break;

        case 'Original':
         return 'o';
        break;

         default:
          return 's';
       }
     }

}
}]);
