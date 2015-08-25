(function () {
  'use strict';

  angular
    .module('steamOrganizerWebApp')
    .controller('AppCtrl', ['$scope', '$location', 'UserService', '$cookies', AppCtrl]);

  function AppCtrl($scope, $location, UserService, $cookies) {
    $scope.dummy = false;
    var ctrl = this;

    ctrl.user = {};

    init();

    function init() {
      var token = $location.search().id;

      if (token) {
        $cookies.put('steamOrganizerWebAppToken', token);
      }

      UserService.getUserInfo().success(function (data) {
        ctrl.user = data;
      });
    }
  }
})();
