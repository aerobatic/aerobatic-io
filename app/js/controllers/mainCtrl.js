angular.module('controllers').controller('MainCtrl', function($scope, $location, content) {
  content.contentIndex().then(function(index) {
    $scope.contentIndex = index;

    if (index.blogPosts.length > 0)
      $scope.mostRecentBlogPost = "blog/" + index.blogPosts[0].url;
  });

  $scope.showLeftMenu = function() {
    var path = $location.path().substring(0, 5);
    return path == '/docs' || path == '/blog';
  };

  $scope.showBlogMenu = function() {
    return $location.path().substring(0, 5) == '/blog';
  };

  $scope.showDocsMenu = function() {
    return $location.path().substring(0, 5) == '/docs';
  };

  // http://plnkr.co/edit/OlCCnbGlYWeO7Nxwfj5G?p=preview
  $scope.navCollapsed = true;

  $scope.isActiveToc = function(content) {
    return $location.path() == content.url;
  };

  $scope.toggleNav = function() {
    $scope.navCollapsed = !$scope.navCollapsed;
  };

  $scope.navSelected = function(path) {
    return $location.path().substring(0, path.length) == path;
  };
});
