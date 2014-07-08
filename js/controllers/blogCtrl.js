angular.module('controllers').controller('BlogCtrl', function($scope, $rootScope, $location, $routeParams, $log, $sce, content) {
  content.contentIndex().then(function(contentIndex) {
    if (_.isEmpty($routeParams)) {
      if (contentIndex.blogPosts.length === 0) {
        $log.debug("No blog posts");
        return $location.path('/');
      }
      else {
        // If this is /blog URL with no extra parameters, change
        // the path to the most recent post.
        return $location.path(_.first(contentIndex.blogPosts).urlPath);
      }
    }

    // Load the content and write it to the page
    var blogPost = _.find(contentIndex.blogPosts, {urlPath: $location.path()});
    if (!blogPost)
      return $location.path('404');

    $scope.blogPost = blogPost;
    content.load(blogPost).then(function(content) {
      $scope.content = $sce.trustAsHtml(content);
    });
  });
});
