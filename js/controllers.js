

define(['angular'], function(angular) {
  var ctrls = {};

  ctrls.MainCtrl = function($scope, $location) {
    $scope.showLeftMenu = function() {
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
    }
  };

  ctrls.MainCtrl.$inject = ['$scope', '$location'];

  ctrls.DocsCtrl = function($scope, $location, $routeParams, $sce, aerobatic) {
    // Get the blog content
    var page = $routeParams.page || 'introduction';

    aerobatic.requireAsset('content/docs/' + page).then(function(content) {
      $scope.content = $sce.trustAsHtml(content);
    });
  };

  ctrls.DocsCtrl.$inject = ['$scope', '$location', '$routeParams', '$sce', 'aerobatic'];

  return ctrls;
});
