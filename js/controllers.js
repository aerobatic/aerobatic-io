angular.module('controllers').controller('MainCtrl', function($scope, $location) {
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
  };
});

angular.module('controllers').controller('DocsCtrl', function($scope, $rootScope, $routeParams, $sce, $http, aerobatic) {
  var page = $routeParams.page || 'introduction';

  // Load the docs content
  var contentUrl;
  if (aerobatic.simulator === true)
    contentUrl = aerobatic.simulatorUrl;
  else if (Modernizr.cors === true)
    contentUrl = aerobatic.cdnUrl;
  else
    contentUrl = '/' + aerobatic.versionKey;

  $http.get(contentUrl + '/dist/content/docs/' + page + '.html').then(function(content) {
    $scope.content = $sce.trustAsHtml(content.data);
    $rootScope.$broadcast('nestedContentLoaded');
  });
});

angular.module('controllers').controller('IndexCtrl', function($scope, $document, $log) {

});
