(function () {
  'use strict';

  angular
    .module('steamOrganizerWebApp')
    .controller('LoginCtrl', ['ENV', LoginCtrl]);

  function LoginCtrl(ENV) {
    var ctrl = this;

    ctrl.loginUrl = ENV.backendApi + '/rs/login';
  }
})();
