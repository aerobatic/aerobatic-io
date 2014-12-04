angular.module('directives').directive('blogAuthor', function($document, $timeout, $sce) {
  return {
    link: function(scope, elem, attr) {
      // Delay 2 seconds to allow time for the blog post to get loaded
      $timeout(function() {
        var authorBio = angular.element(document.querySelector("#blogAuthorBio")).attr("value");
        elem.html(authorBio);
      }, 2000);
    }
  };
});
