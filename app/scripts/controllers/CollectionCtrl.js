(function() {
  'use strict';

  angular
    .module('steamOrganizerWebApp')
    .controller('CollectionCtrl', ['$scope', '$interval', 'CollectionService',
      CollectionCtrl
    ]);

  function CollectionCtrl($scope, $interval, CollectionService) {
    var ctrl = this;

    ctrl.scope = $scope;
    ctrl.games = [];
    ctrl.filteredGames = [];
    ctrl.refreshLibrary = refreshLibrary;
    ctrl.categories = [];
    ctrl.genres = [];
    ctrl.languages = [];
    ctrl.selectedCategories = [];
    ctrl.selectedGenres = [];
    ctrl.selectedLanguages = [];
    ctrl.statusClasses = statusClasses;
    ctrl.interval = {};
    ctrl.processStatus = {};
    ctrl.refreshFilter = refreshFilter;
    ctrl.clearSelection = clearSelection;

    init();

    function init() {
      loadLibrary();
      createInterval();
    }

    function clearSelection() {
      ctrl.selectedCategories = [];
      ctrl.selectedGenres = [];
      ctrl.selectedLanguages = [];
      refreshFilter();
    }

    function loadLibrary() {
      CollectionService.getAppList().success(function(data) {
        ctrl.games = data;
        ctrl.filteredGames = ctrl.games;
      });
      getCategories();
      getGenres();
      getLanguages();
    }

    function refreshFilter() {

      ctrl.filteredGames = ctrl.games.filter(function(game) {
        return ctrl.selectedCategories.every(function(element) {
          return game.categories.indexOf(element) !== -1;
        });
      });

      ctrl.filteredGames = ctrl.filteredGames.filter(function(game) {
        return ctrl.selectedGenres.every(function(element) {
          return game.genres.indexOf(element) !== -1;
        });
      });

      ctrl.filteredGames = ctrl.filteredGames.filter(function(game) {
        return ctrl.selectedLanguages.every(function(element) {
          return game.supported_languages.indexOf(element) !== -1;
        });
      });
    }

    function refreshLibrary() {
      CollectionService.refreshLibrary().success(function() {
        createInterval();
      });
    }

    function createInterval() {
      ctrl.mensagem = 'Processing request... ';
      ctrl.interval = $interval(function() {
        CollectionService.getProcessStatus()
          .success(function(data) {
            ctrl.processStatus = data;

            if (ctrl.processStatus) {
              if (ctrl.processStatus.state === 'PENDING') {
                ctrl.mensagem = 'Processing request... ';
              } else if (ctrl.processStatus.state === 'PROGRESS') {
                ctrl.mensagem = 'Processing request... ' + ctrl.processStatus
                  .currentName + ' ' + ctrl.processStatus.current + '/' +
                  ctrl.processStatus.total;
              } else if (ctrl.processStatus.state === 'SUCCESS') {
                ctrl.mensagem = 'Request successful processed. Total:' +
                  ctrl.processStatus.total;
                $interval.cancel(ctrl.interval);
                ctrl.interval = undefined;
                loadLibrary();
              } else {
                ctrl.mensagem = 'Processing error. Please try again';
                $interval.cancel(ctrl.interval);
                ctrl.interval = undefined;
                loadLibrary();
              }
            }
          }).error(function() {
            $interval.cancel(ctrl.interval);
            ctrl.interval = undefined;
            loadLibrary();
          });
      }, 2000);
    }

    function statusClasses(array, index) {
      return array[index] ? 'btn btn-primary btn-primary-selected' :
        'btn btn-primary';
    }

    function getCategories() {
      ctrl.categories.length = 0;
      CollectionService.getCategories().success(function(data) {
        ctrl.categories = data;
      });
    }

    function getGenres() {
      ctrl.genres.length = 0;
      CollectionService.getGenres().success(function(data) {
        ctrl.genres = data;
      });
    }

    function getLanguages() {
      ctrl.languages.length = 0;
      CollectionService.getLanguages().success(function(data) {
        ctrl.languages = data;
      });
    }
  }
})
();
