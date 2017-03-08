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
