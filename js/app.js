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
  'angular-route',
  'angular-animate',
  'angular-bootstrap',
  'css!//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
  'css!//fonts.googleapis.com/css?family=Open+Sans:300,400,600,800',
  'css!font/fontello-embedded',
  'css!//yandex.st/highlightjs/8.0/styles/default.min.css', // Used for code highlighting in markdown
  'css!css/theme',
  'css!css/custom'
], function(angular, ga, aerobatic) {
  'use strict';

  define('aerobatic-io-app', function(require) {
    var views = {
      layout: require('asset!partials/layout'),
      index: require('asset!partials/index'),
      docs: require('asset!partials/docs'),
      blog: require('asset!partials/blog'),
      gallery: require('asset!partials/gallery'),
      contact: require('asset!partials/contact')
    };

    var app = angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'aerobatic', 'directives']);

    // Register each of the controllers with the app
    var controllers = require('asset!js/controllers');
    for (var ctrl in controllers) {
      app.controller(ctrl, controllers[ctrl]);
    }

    // Create a custom angular service that encapsulates the communication with google analytics
    app.service('analytics', ['$rootScope', '$location', '$log', '$aerobatic', function($rootScope, $location, $log, $aerobatic) {
      // http://burgiblog.com/2013/07/09/google-analytics-and-requirejs/
      $rootScope.$on('$viewContentLoaded', function() {
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#send
        $log.info("Page view changed to " + $location.path());

        if ($aerobatic.simulator !== true) {
          ga('send', 'pageview', {
            page: $location.path()
          });
        }
      });

      //This is just a comment to force a change
      return {
        initialize: function() {
          // Initialize google analytics tracking
          if ($aerobatic.simulator !== true)
            ga('create', $aerobatic.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
        }
      };
    }]);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      // Use the bang prefix for Google ajax crawlability
      // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
      $locationProvider.hashPrefix('!');

      $routeProvider.when('/', { template: views.index })
        .when('/docs/:page?', { template: views.docs })
        .when('/blog', { template: views.blog })
        .when('/contact', {template: views.contact })
        .when('/gallery', {template: views.gallery})
        .otherwise({ redirectTo: '/' });
      }
    ]);

    app.run(['$log', '$rootScope', 'analytics', function ($log, $rootScope, analytics) {
      $log.info("Angular app aerobatic-io run event");
      analytics.initialize();
    }]);

    angular.element(document).ready(function() {
      // Append an ng-view to the body to load our partial views into
      angular.element(document.body).append(angular.element(views.layout));
      angular.bootstrap(document, ['aerobatic-io']);
    });
  });

  require(['angular-aerobatic', 'asset!js/directives', 'aerobatic-io-app']);
});
