'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'myApp.controllers',
        'ui.router',
        'ngMaterial',
        'api.service',
        'api.directives'
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
