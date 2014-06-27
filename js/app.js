
angular.module('services', []);
angular.module('controllers', ['services']);
angular.module('directives', ['services']);
angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'services', 'controllers', 'directives']);

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
