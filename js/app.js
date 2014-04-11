/**
 * The main app module
 *
 * @type {angular.Module}
 */

// In the outer define bring in all the 3rd party dependencies.
// , 'jquery-flexslider', 'jquery-scrollto', 'jquery-localscroll', 'jquery-stellar', 'jquery-owl-carousel'
define([
  'angular',
  'google-analytics',
  'aerobatic',
  'angular-route',
  'angular-animate',
  'jquery'
], function(angular, ga, aerobatic) {
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
    var app = angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'aerobatic', 'analytics']);

    // Create a custom angular service that encapsulates the communication with google analytics
    angular.module('analytics', []).service('analytics', ['$rootScope', '$location', function($rootScope, $location) {
      // http://burgiblog.com/2013/07/09/google-analytics-and-requirejs/
      $rootScope.$on('$viewContentLoaded', function() {
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#send
        ga('send', 'pageview', {
          page: $location.path()
        });
      });

      return {
        initialize: function() {
          ga('create', aerobatic.config.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
        }
      }
    }]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          template: indexView
        }).when('/docs', {
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

    var headerCtrl = function($scope, $location) {
      // $scope.loadView = function(viewName, event) {
      //   $location.path(viewName);
      //   event.preventDefault();
      // };
    };

    headerCtrl.$inject = ['$scope', '$location'];
    app.controller('HeaderCtrl', headerCtrl);

    app.animation('.my-slide-animation', function() {
      return {
        // TODO: Replace with move.js css3 animations
        enter : function(element, done) {
          jQuery(element).css({
            position:'absolute',
            'z-index':100,
            top:600,
            opacity:0
          });
          jQuery(element).animate({
            top:0,
            opacity:1
          }, done);
        },

        leave : function(element, done) {
          jQuery(element).css({
            position:'absolute',
            'z-index':101,
            top:0,
            opacity:1
          });
          jQuery(element).animate({
            top:-600,
            opacity:0
          }, done);
        }
      };
    });

    angular.element(document).ready(function() {
      // Append an ng-view to the body to load our partial views into
      angular.element(document.body).append(angular.element(layoutView));
      angular.bootstrap(document, ['aerobatic-io']);
    });
  });
});
