(function () {
  'use strict';

  angular
    .module('steamOrganizerWebApp')
    .factory('CollectionService', ['$http', CollectionService]);

  function CollectionService($http) {

    var service = this;

    service.getAppList = function () {
      return $http.get('/rs/apps', {});
    };

    service.refreshLibrary = function () {
      return $http.post('/rs/apps/refresh', {});
    };

    service.getCategories = function () {
      return $http.get('/rs/apps/categories', {});
    };

    service.getGenres = function () {
      return $http.get('/rs/apps/genres', {});
    };

    service.getLanguages = function () {
      return $http.get('/rs/apps/languages', {});
    };

    service.getProcessStatus = function() {
      return $http.get('/rs/apps/refresh/status', {});
    };

    return {
      getAppList: service.getAppList,
      refreshLibrary: service.refreshLibrary,
      getCategories: service.getCategories,
      getProcessStatus: service.getProcessStatus,
      getGenres: service.getGenres,
      getLanguages: service.getLanguages
    };
  }
})();
