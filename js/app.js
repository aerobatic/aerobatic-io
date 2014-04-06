/**
 * The main app module
 *
 * @type {angular.Module}
 */

// In the outer define bring in all the 3rd party dependencies.
// , 'jquery-flexslider', 'jquery-scrollto', 'jquery-localscroll', 'jquery-stellar', 'jquery-owl-carousel'
define(['angular', 'angular-route', 'angular-animate', 'jquery'], function(angular) {
  'use strict';

  require(['asset!partials/layout', 'asset!partials/index', 'asset!partials/docs', 'asset!partials/blog', 'asset!partials/gallery', 'asset!js/aerobatic-angular'], function(layoutView, indexView, docsView, blogView, galleryView) {
    var app = angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'aerobatic']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.when('/', {
          template: indexView
        }).when('/docs', {
          template: docsView
        }).when('/blog', {
          template: blogView
        }).when('/gallery', {
          template: galleryView
        }).otherwise({
          redirectTo: '/'
        });
      }
    ]);

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

      // $('#flexHome').flexslider({
      //   animation: "slide",
      //   controlNav: true,
      //   directionNav: false,
      //   touch: true,
      //   direction: "vertical",
      //   slideshow: true,
      //   slideshowSpeed: 3000
      // });

      // if ($('.localscroll').length) {
      //   $('.localscroll').localScroll({
      //     lazy: true,
      //     offset: {
      //       top: -($('#mainHeader').height() - 1)
      //     }
      //   });
      // }

      // var isMobile = false;

      // if (Modernizr.testProp('only all and (max-width: 1024px)')) {
      //   isMobile = true;
      // }

      // if (isMobile === false && ($('#paralaxSlice1').length || isMobile === false && $('#paralaxSlice2').length)) {
      //   $(window).stellar({
      //     horizontalScrolling: false,
      //     responsive: true
      //     /*,
      //       scrollProperty: 'scroll',
      //       parallaxElements: false,
      //       horizontalScrolling: false,
      //       horizontalOffset: 0,
      //       verticalOffset: 0*/
      //   });
      // }
    });
  });
});