/**
 * The main app module
 *
 * @type {angular.Module}
 */

// In the outer define bring in all the 3rd party dependencies.
define([
  'angular',
  'google-analytics',
  'aerobatic',
  'asset!js/move',
  'angular-route',
  'angular-animate',
  'angular-bootstrap',
  'css!//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
  'css!http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800',
  'css!font/fontello-embedded',
  'css!css/theme',
  'css!css/custom'
], function(angular, ga, aerobatic, move) {
  'use strict';

  require([
    'asset!partials/layout',
    'asset!partials/index',
    'asset!partials/docs',
    'asset!partials/blog',
    'asset!partials/gallery',
    'asset!partials/about',
    'asset!js/aerobatic-angular'
  ], function(layoutView, indexView, docsView, blogView, galleryView, aboutView) {
    var app = angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'aerobatic']);

    // Create a custom angular service that encapsulates the communication with google analytics
    app.service('analytics', ['$rootScope', '$location', '$log', function($rootScope, $location, $log) {
      // http://burgiblog.com/2013/07/09/google-analytics-and-requirejs/
      $rootScope.$on('$viewContentLoaded', function() {
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#send
        $log.info("Page view changed to " + $location.path());

        if (aerobatic.config.simulator !== true) {
          ga('send', 'pageview', {
            page: $location.path()
          });
        }
      });

      return {
        initialize: function() {
          // Initialize google analytics tracking
          if (aerobatic.config.simulator !== true)
            ga('create', aerobatic.config.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
        }
      };
    }]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        // Use the bang prefix for Google ajax crawlability
        // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
          template: indexView
        }).when('/docs/:section?', {
          template: docsView
        }).when('/blog', {
          template: blogView
        }).when('/about', {
          template: aboutView
        }).when('/gallery', {
          template: galleryView
        }).otherwise({
          redirectTo: '/'
        });
      }
    ]);

    app.run(['$log', 'analytics', function ($log, analytics) {
      $log.info("Angular app aerobatic-io run event");
      analytics.initialize();
    }]);

    var mainCtrl = function($scope, $location) {
      $scope.showLeftMenu = function() {
        return $location.path().substring(0, 5) == '/docs';
      };

      // http://plnkr.co/edit/OlCCnbGlYWeO7Nxwfj5G?p=preview
      $scope.navCollapsed = true;

      $scope.isActiveToc = function(path) {
        var pathParts = $location.path().split('/');
        return pathParts[pathParts.length - 1] == path;
      };

      // $scope.navClick = function(path, event) {
      //   $location.path(path);
      //   event.target.blur();
      //   event.preventDefault();
      // }

      $scope.toggleNav = function() {
        $scope.navCollapsed = !$scope.navCollapsed;
      };

      $scope.navSelected = function(path) {
        return $location.path() == path;
      }
    };

    mainCtrl.$inject = ['$scope', '$location'];
    app.controller('MainCtrl', mainCtrl);

    var docsCtrl = function($scope, $location, $routeParams) {
      $scope.heading = $routeParams.section;
    };
    docsCtrl.$inject = ['$scope', '$location', '$routeParams'];

    app.controller('DocsCtrl', docsCtrl);

    angular.element(document).ready(function() {
      // Append an ng-view to the body to load our partial views into
      angular.element(document.body).append(angular.element(layoutView));
      angular.bootstrap(document, ['aerobatic-io']);
    });
  });
});
