// Create a custom angular service that encapsulates the communication with google analytics
angular.module('services').service('analytics', function($rootScope, $location, $log, aerobatic) {
  // http://burgiblog.com/2013/07/09/google-analytics-and-requirejs/
  $rootScope.$on('$viewContentLoaded', function() {
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#send
    $log.info("Page view changed to " + $location.path());

    if (aerobatic.simulator !== true && _.isFunction(ga)) {
      ga('send', 'pageview', {
        page: $location.path()
      });
    }
  });

  //This is just a comment to force a change
  return {
    initialize: function() {
      // Initialize google analytics tracking
      if (aerobatic.simulator !== true && _.isFunction(ga))
        ga('create', aerobatic.settings.GOOGLE_ANALYTICS_TRACK_CODE, {});
    }
  };
});
