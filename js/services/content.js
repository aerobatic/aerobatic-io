angular.module('services').service('content', function($rootScope, $http, $q, $log, aerobatic) {
  var markdownRepo = 'https://api.github.com/repos/aerobatic/markdown-content';

  // A sample object in the tree array looks like so:
  //  {
        // mode: "100644"
        // path: "blog/2014/07/03/first-blog-post.md"
        // sha: "80257a4d5228b6229f34c7416143d6cfbadca86c"
        // size: 23
        // type: "blob"
        // url: "https://api.github.com/repos/aerobatic/markdown-content/git/blobs/80257a4d5228b6229f34c7416143d6cfbadca86c"
  //  }

  function buildIndexFromGitTree(tree) {
    var index = {
      blogPosts: [],
      docArticles: []
    };

    _.each(tree, function(node) {
      if (node.type === 'blob') {
        // Value of path is in format 'blog/yyyy/mm/dd/title.md'
        var path = node.path.split('/');
        if (path[0] === 'blog') {
          // Strip off the .md extension
          var title = _.strLeftBack(path[4], '.');

          // Use underscore.string to slugify the title
          var titleSlug = _.slugify(title);

          index.blogPosts.push({
            // Build a JS date from '2014/07/05'
            date: new Date(parseInt(path[1]), parseInt(path[2]) - 1, parseInt(path[3])),
            title: title,
            sha: node.sha,
            gitPath: node.path,
            titleSlug: titleSlug,
            // Use underscore.string slugify function to get a URL safe
            // reprensentation of the title
            urlPath: '/' + path.slice(0, 4).concat(titleSlug).join('/')
          });
        }
        // path is in the form docs/01-introduction.md
        else if (path[0] === 'docs') {
          var titleParts = path[1].split('_');
          var articleTitle = _.strLeftBack(titleParts[1], '.');
          var slug = _.slugify(articleTitle);

          index.docArticles.push({
            title: articleTitle,
            slug: slug,
            sequence: titleParts[0],
            gitPath: node.path,
            urlPath: '/docs/' + slug
          });
        }
      }
    });

    // Sort the blogPosts in reverse chronological order and doc articles
    // by the sequence prefix, i.e. 01, 02, etc.
    index.blogPosts = _.sortBy(index.blogPosts, 'date').reverse();
    index.docArticles = _.sortBy(index.docArticles, 'sequence');
    return index;
  }

  var contentIndexDeferred = $q.defer();
  return {
    initialize: function() {
      $log.info("Loading content index from GitHub");
      // Go fetch the GitHub tree with references to our Markdown content blobs
      var apiUrl = markdownRepo + '/git/trees/master?recursive=1';

      $http.get('/proxy?url=' + encodeURIComponent(apiUrl) + '&cache=1&ttl=600').success(function(data) {
        var contentIndex = buildIndexFromGitTree(data.tree);
        contentIndexDeferred.resolve(contentIndex);
      }).error(function(err) {
        contentIndexDeferred.reject(err);
        $log.error("Error initializing content index", err);
      });
    },
    contentIndex: function() {
      return contentIndexDeferred.promise;
    },
    load: function(object) {
      // Rather than the GitHub API, just grab the raw source.
      var apiUrl = 'https://raw.githubusercontent.com/aerobatic/markdown-content/master/' + encodeURIComponent(object.gitPath);

      var deferred = $q.defer();

      var proxyUrl = '/proxy?url=' + encodeURIComponent(apiUrl);

      // Instruct the proxy to cache the content for 1 hour.
      proxyUrl += '&cache=1&ttl=' + (60 * 60);

      // Specify that the API response should pass through the markdown transform
      proxyUrl += '&transform=markdown';

      $log.debug("Proxying api call", apiUrl);
      $http.get(proxyUrl).success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        $log.error("Error returned from API proxy", err);
        deferred.reject(err);
      });

      // Return a promise to the caller
      return deferred.promise;
    }
  };
});
