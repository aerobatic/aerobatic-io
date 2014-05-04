

define(['angular'], function(angular) {
  var ctrls = {};

  ctrls.MainCtrl = function($scope, $location) {
    $scope.docsTableOfContents = [
      ['introduction', 'Introduction'],
      ['getting-started', 'Getting Started'],
      ['asset-delivery', 'Asset Delivery'],
      ['developing-apps', 'Developing Apps'],
      ['backend-integration', 'Backend Integration'],
      ['traffic-control', 'Traffic Control'],
      ['seo', 'SEO'],
      ['security', 'Security/Auth'],
      ['technical-details', 'Technical Details']
    ];

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

  ctrls.DocsCtrl = function($scope, $rootScope, $location, $routeParams, $sce, $aerobatic) {
    // Get the blog content
    var page = $routeParams.page || 'introduction';

    $aerobatic.requireAsset('content/docs/' + page).then(function(content) {
      $scope.content = $sce.trustAsHtml(content);
      // $rootScope.$broadcast('nestedContentLoaded');
    });
  };

  ctrls.DocsCtrl.$inject = ['$scope', '$rootScope', '$location', '$routeParams', '$sce', '$aerobatic'];

  ctrls.IndexCtrl = function($scope, $document, $log) {
  };
  ctrls.IndexCtrl.$inject = ['$scope','$document','$log'];

  return ctrls;
});
