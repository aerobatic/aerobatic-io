angular.module('controllers').controller('MainCtrl', function($scope, $location, content) {
  $scope.docsTableOfContents = [
    ['introduction', 'Introduction'],
    ['getting-started', 'Getting Started'],
    // ['asset-delivery', 'Asset Delivery'],
    // ['developing-apps', 'Developing Apps'],
    ['backend-integration', 'Backend Integration'],
    ['traffic-control', 'Traffic Control']
    // ['seo', 'SEO'],
    // ['security', 'Security/Auth'],
    // ['technical-details', 'Technical Details']
  ];

  content.contentIndex().then(function(index) {
    $scope.contentIndex = index;
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

  $scope.isActiveToc = function(path) {
    var pathParts = $location.path().split('/');
    return pathParts[pathParts.length - 1] == path;
  };

  // $scope.navClick = function(path, event) {
  //   event.target.blur();
  //   event.preventDefault();
  // }

  $scope.toggleNav = function() {
    $scope.navCollapsed = !$scope.navCollapsed;
  };

  $scope.navSelected = function(path) {
    return $location.path().substring(0, path.length) == path;
  };
});
