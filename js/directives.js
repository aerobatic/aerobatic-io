angular.module('directives').directive('markdownContent', function($rootScope, $sce) {

  return function(scope, element, attrs) {
    // Based on the ngBindHtml directive
    scope.$watch($sce.parseAsHtml(attrs.markdownContent), function(value) {
      element.html(value || '');

      // Apply the table class on all table elements. This will
      // provide the bootstrap styling for tables.
      element.find('table').addClass('table table-bordered');

      // Find all anchors whose href is an absolute url
      angular.forEach(element.find("a"), function(link) {
        link = angular.element(link);
        if (/^http[s]?\:\/\//.test(link.attr('href'))) {
          link.addClass('external');
          link.attr('target', "external");
        }
      });

      // for (link in element.find('a[href]')) {
      //   if (/^http(s)?:\/\//.testlink.attr('href'))
      //     link.addClass('external');
      // }
    });
  };
});

angular.module('directives').directive('assetSrc', function(aerobatic) {
  return function(scope, element, attrs) {
    element.attr('src', aerobatic.cdnUrl + '/' + attrs.assetSrc);
  };
});

// Simple directive that appends a marker div to the body of the document
// after a configured timeout period.
angular.module('directives').directive('snapshotReady', function($document, $timeout) {
  return function(scope, element, attrs) {
    $timeout(function () {
      $document.find("body").append('<div id="snapshotReady"/>');
    }, 3000);
  };
});
