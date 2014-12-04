angular.module('controllers').controller('DocsCtrl', function($scope, $rootScope, $location, $routeParams, $document, $sce, aerobatic, content) {
  content.contentIndex().then(function(index) {
    if (!$routeParams.article) {
      // If no article specified, redirect to the first one.
      return $location.path(index.docArticles[0].urlPath);
    }

    var article = _.find(index.docs, {'url': $routeParams.article});
    if (!article)
      return $location.path('404');

    // Set the title of the page
    $document[0].title = 'Aerobatic Docs | ' + article.title;

    $scope.docArticle = article;
    content.load('docs/' + article.url + '.md').then(function(content) {
      $scope.content = $sce.trustAsHtml(content);
      $rootScope.$broadcast('nestedContentLoaded');
    });
  });
});
