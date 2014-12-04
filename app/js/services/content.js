angular.module('services').service('content', function($rootScope, $http, $q, $log, aerobatic) {
  var markdownRepo = 'https://api.github.com/repos/aerobatic/markdown-content';

  var contentIndexDeferred = $q.defer();

  var gitBranch = 'docs-refactor';
  return {
    initialize: function() {
      $log.info("Loading content index from GitHub");
      // Go fetch the GitHub tree with references to our Markdown content blobs
      
      loadGitRaw('index.json', {accept: 'application/json'}).then(function(contentIndex) {
        contentIndex.blogPosts = _.sortBy(contentIndex.blogPosts, 'url').reverse();
        contentIndexDeferred.resolve(contentIndex);
      });
    },
    contentIndex: function() {
      return contentIndexDeferred.promise;
    },
    load: function(gitPath) {
      return loadGitRaw(gitPath, { accept: 'text/html', transform: 'markdown'}); 
    }
  };

  // Rather than the GitHub API, just grab the raw source.
  function loadGitRaw(gitPath, options, callback) {
    var apiUrl = 'https://raw.githubusercontent.com/aerobatic/markdown-content/' + gitBranch + '/' + encodeURIComponent(gitPath);

    var deferred = $q.defer();

    var httpOptions = {
      params: {
        url: apiUrl,
        cache: 1,
        ttl: 60*60
      },
      headers: {
        Accept: options.accept || 'text/html'
      }
    };

    if (options.transform)
      httpOptions.params.transform = options.transform;

    $log.debug("Proxying api call", apiUrl);
    $http.get('/proxy', httpOptions)
      .success(function(data) {
        $log.debug('Content received from proxy');
        deferred.resolve(data);
      }).error(function(err) {
        $log.error("Error returned from API proxy", err);
        deferred.reject(err);
      });

    // Return a promise to the caller
    return deferred.promise;
  }
});