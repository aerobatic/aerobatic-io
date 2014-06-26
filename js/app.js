
angular.module('controllers', []);
angular.module('directives', []);
angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'controllers', 'directives']);

angular.module('aerobatic-io').value('aerobatic', window.__config__);

// Create a custom angular service that encapsulates the communication with google analytics
angular.module('aerobatic-io').service('analytics', function($rootScope, $location, $log, aerobatic) {
  // http://burgiblog.com/2013/07/09/google-analytics-and-requirejs/
  $rootScope.$on('$viewContentLoaded', function() {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#send
    $log.info("Page view changed to " + $location.path());

    if (aerobatic.simulator !== true) {
      ga('send', 'pageview', {
        page: $location.path()
      });
    }
  });

  //This is just a comment to force a change
  return {
    initialize: function() {
      // Initialize google analytics tracking
      if (aerobatic.simulator !== true)
        ga('create', aerobatic.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
    }
  };
});

angular.module('aerobatic-io').config(function($routeProvider, $locationProvider) {
  // Use the bang prefix for Google ajax crawlability
  // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/', { template: JST['partials/index']() })
    .when('/docs/:page?', { template: JST['partials/docs']() })
    .when('/blog', { template: JST['partials/blog']() })
    .when('/contact', {template: JST['partials/contact']() })
    .when('/gallery', {template: JST['partials/gallery']() })
    .otherwise({ redirectTo: '/' });
});

angular.module('aerobatic-io').run(function ($log, $rootScope, analytics) {
  $log.info("Angular app aerobatic-io run event");
  analytics.initialize();
});
