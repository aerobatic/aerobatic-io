angular.module('controllers').controller('BlogCtrl', function($scope, $rootScope, $location, $routeParams, $log, $sce, $document, content) {
  content.contentIndex().then(function(contentIndex) {
    var routeKeys = _.keys($routeParams);
    if (routeKeys.length === 0) {
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
    // There must not be a title, so render the blog index
    else if (routeKeys.length < 4) {
      var datePrefix = _.compact([$routeParams.year, $routeParams.month, $routeParams.day]).join('/');
      $scope.indexPosts = _.filter(contentIndex.blogPosts, function(post) {
        return _.startsWith(post.gitPath, 'blog/' + datePrefix);
      });
      return;
    }
    // If the route has all 4 parts yyyy/mm/dd/title then render the actual post
    else {
      // Load the content and write it to the page
      var blogPost = _.find(contentIndex.blogPosts, {urlPath: $location.path()});
      if (!blogPost)
        return $location.path('404');

      // Set the title of the page
      $document[0].title = 'Aerobatic | ' + blogPost.title;

      $scope.blogPost = blogPost;
      content.load(blogPost).then(function(content) {
        $scope.content = $sce.trustAsHtml(content);
      });
    }
  });
});
