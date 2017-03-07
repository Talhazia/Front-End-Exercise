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
