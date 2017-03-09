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
            switch (_string) {

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

                case 'Large 2048':
                    return 'k';
                    break;

                default:
                    return 's';
            }
        }

    }
}]);
