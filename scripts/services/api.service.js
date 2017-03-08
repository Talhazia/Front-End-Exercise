'use strict';

var services = angular.module('api.service', []);

services.factory('apiData', ['$http', function($http) {
  return {
     getData: function(page_num) {
          return $http.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&page=' + page_num);
     }
}
}]);
