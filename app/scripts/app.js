(function () {
  'use strict';

  angular
    .module('steamOrganizerWebApp', [
      'config',
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ui.select'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/templates/collection.html',
          controller: 'CollectionCtrl',
          controllerAs: 'collection'
        })
        .when('/login', {
          templateUrl: '/templates/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        });

      $httpProvider.interceptors.push(function ($q, $location, $cookies, ENV) {
        return {
          'request': function (config) {
            var token = $cookies.get('steamOrganizerWebAppToken');
            if (token) {
              config.headers.authorization = token;
            }
            if (config.url.indexOf('/rs/') === 0) {
              config.url = ENV.backendApi + config.url;
            }

            return config;
          },
          responseError: function (rejection) {
            if (rejection.status === 401) {
              $location.path('/login');
            }
            return $q.reject(rejection);
          }
        };
      });

    });
})();
