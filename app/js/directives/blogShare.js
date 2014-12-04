
// https://developers.google.com/+/web/share/#sharelink
// https://dev.twitter.com/docs/tweet-button
// http://www.reddit.com/buttons/

angular.module('directives')
.directive('blogShare', function($window, $document, $log, analytics) {
  var networks = {
    linkedin: {
      // https://developer.linkedin.com/documents/share-linkedin
      url: "https://www.linkedin.com/shareArticle?mini=true&url={{href}}&title={{title}}&source={{source}}"
    },
    google: {
      // https://developers.google.com/+/web/share/#sharelink
      url: "https://plus.google.com/share?url={{href}}"
    },
    twitter: {
      url: "https://twitter.com/intent/tweet?text={{title}}&url={{href}}&via={{twitterHandle}}"
    },
    reddit: {
      url: "http://www.reddit.com/submit?url={{href}}&title={{title}}"
    },
    hackernews: {
      url: "http://news.ycombinator.com/submitlink?u={{fullHref}}&t={{title}}"
    }
  };

  return {
    restrict: 'C',
    link: function(scope, element, attr) {
      var popupUrl;
      var network = networks[attr.shareNetwork];
      if (!network) {
        $log.error("Invalid blog share network " + attr.shareNetwork);
        return;
      }

      element.bind('click', function() {
        var shortUrl = angular.element(document.querySelector("#blogShortUrl")).attr("value");
        var blogTitle = angular.element(document.querySelector("#blogTitle")).text();

        var params = {
          fullHref: encodeURIComponent($window.location.href),
          href: encodeURIComponent(shortUrl || $window.location.href),
          title: encodeURIComponent(blogTitle),
          twitterHandle: 'aerobaticapp',
          source: encodeURIComponent('Aerobatic Blog')
        };

        _.defaults(network, {
          width: 600,
          height: 600
        });

        var shareUrl = _.template(network.url, params);
        var windowOptions = _.template("menubar=no,location=no,resizable=no,"+
          "scrollbars=no,status=no,width={{width}},height={{height}}," +
          "top=100,left=100", network);

        // TODO: Detect if this is touch device. If so open a new window rather than a popup

        $window.open(shareUrl, 'sharePopup', windowOptions);
        this.blur();
      });
    }
  };
});
