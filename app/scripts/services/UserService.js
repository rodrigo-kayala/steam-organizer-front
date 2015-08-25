(function () {
  'use strict';

  angular
    .module('steamOrganizerWebApp')
    .factory('UserService', ['$http', UserService]);

  function UserService($http) {

    var service = this;

    service.getUserInfo = function () {
      return $http.get('/rs/users');
    };

    return {
      getUserInfo: service.getUserInfo
    };
  }
})();
