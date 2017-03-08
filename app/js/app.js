'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'myApp.controllers',
        'ui.router',
        'ngMaterial',
        'api.service',
        'api.directives',
        'com.verico.ng-galleria'
    ])
    .run(function() {

    })
    .config(['$stateProvider', '$urlRouterProvider', 'galleriaProvider', function($stateProvider, $urlRouterProvider, galleriaProvider) {

      galleriaProvider.setPath('./galleria/themes/classic/galleria.classic.js');

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

'use strict';

var services = angular.module('api.service', []);

services.factory('apiData', ['$http', function($http) {
  return {
     getData: function(page_num) {
          return $http.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&page=' + page_num);
     }
}
}]);
