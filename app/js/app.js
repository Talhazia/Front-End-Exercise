'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'myApp.controllers',
        'ui.router',
        'ngMaterial',
        'api.service'
    ])
    .run(function() {
      console.log("working");
    })
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('/home');
    }]);

'use strict';

angular.module('myApp.controllers', [])

.controller('galleryController', ['apiData', '$scope', function(apiData, $scope) {
    console.log("galleryController loeaded");

}]);

'use strict';

angular.module('myApp.controllers')

.controller('HomeController', ['$scope', function($scope) {
    console.log("Home controller loaded");

}]);

'use strict';

var services = angular.module('api.service', []);

services.factory('apiData', ['$http', function($http) {

}]);
