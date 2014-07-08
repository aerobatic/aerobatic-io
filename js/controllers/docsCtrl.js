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
