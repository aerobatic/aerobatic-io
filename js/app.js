// Mixin underscore.string with lodash
_.mixin(_.str.exports());

// Use mustache style delimiters for the _.template function
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

angular.module('services', []);
angular.module('controllers', ['services']);
angular.module('directives', ['services']);
angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'services', 'controllers', 'directives']);

angular.module('services').value('aerobatic', window.__config__);

angular.module('aerobatic-io').config(function($routeProvider, $locationProvider) {
  // Use the bang prefix for Google ajax crawlability
  // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
  $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('!');

  $routeProvider.when('/', { template: JST['partials/index']() })
    .when('/docs/:article?', { template: JST['partials/docs'](), controller: 'DocsCtrl' })
    .when('/blog/:year?/:month?/:day?/:title?', { template: JST['partials/blog'](), controller: 'BlogCtrl'})
    .when('/contact', {template: JST['partials/contact']() })
    .when('/gallery', {template: JST['partials/gallery']() })
    .otherwise({ redirectTo: '/' });
});

angular.module('aerobatic-io').run(function ($log, $rootScope, $http, analytics, content) {
  $log.info("Angular app aerobatic-io run event");
  analytics.initialize();
  content.initialize();
});
