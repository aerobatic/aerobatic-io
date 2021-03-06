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
    });
  };
});

angular.module('directives').directive('assetSrc', function(aerobatic) {
  return function(scope, element, attrs) {
    element.attr('src', aerobatic.cdnUrl + '/' + attrs.assetSrc);
  };
});
