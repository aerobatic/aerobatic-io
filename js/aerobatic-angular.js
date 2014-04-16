define(['angular', 'aerobatic'], function(angular, aerobatic) {
  'use strict';

  var module = angular.module('aerobatic', []);

  module.factory('aerobatic', ['$q', function($q) {
    // Promise wrapper around the require function to allow
    // angular to asynchrounously pull in assets following angular idioms.
    aerobatic.requireAsset = function(path) {
      var deferred = $q.defer();
      require(['asset!' + path], function(asset) {
        deferred.resolve(asset);
      });
      return deferred.promise;
    };

    return aerobatic;
  }]);

  module.directive('assetHref', ['aerobatic', function (aerobatic) {
    return {
      priority: 1, // it needs to run after the attributes are interpolated
      restrict: 'A',
      link: function(scope, element, attr) {
        // Set the href attribute to the assetUrl.
        attr.$set("href", aerobatic.assetUrl(attr.assetHref));
      }
    };
  }]);

  module.directive('assetSrc', ['aerobatic', function (aerobatic) {
    return {
      priority: 99, // it needs to run after the attributes are interpolated
      restrict: 'A',
      link: function(scope, element, attr) {
        // Set the href attribute to the assetUrl.
        attr.$set("src", aerobatic.assetUrl(attr.assetSrc));
      }
    };
  }]);
});
