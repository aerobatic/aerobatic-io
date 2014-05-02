# Developing Apps

Aerobatic tries to keep out of your way as much as possible. The vast majority of your app code will not be specific to Aerobatic at all. The site you are looking at right now, www.aerobatic.io, is itself an Aerobatic app built with AngularJS and Bootstrap. All the sample snippets below are taken from this codebase. The entire project is a [public GitHub repo](https://github.com/aerobatic/aerobatic-io) so you are free to peruse the source or clone it and use as a starting point for your own app.

<a id="requirejs"></a>
##RequireJS
Aerobatic strives to be unopinionated about how you build apps, however it does currently mandate the use of [RequireJS](http://requirejs.org) to asynchronously load your client assets. The technical reason for this is to enable the simulator mode (more about that below) which allows local development directly against the production site URL. With RequireJS it is possible to defer the determination of where to download assets to the browser rather than the server rendering script urls directly to the page response. Independent of Aerobatic, using an AMD loader like RequireJS provides many benefits to a single page web app, particularly as it grows in complexity. 

While RequireJS is a powerful library with some advanced features, you really only need to understand a few basic constructs - the define and require functions, and a little about how configuration works. The sample apps have the boilerplate already declared, so starting from there and tweaking it for your needs is the best way to get going.

The way RequireJS is declared on the page differs slightly in Aerobatic than a standalone app. In the official docs and in tutorials you will see code snippets similar to the following:

```html
<head>
    <!-- Load the script "js/main.js" as our entry point -->
    <script data-main="js/main" src="js/libs/require/require.js"></script>
</head>
```
```javascript
require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
  }
});
```

With Aerobatic you don't actually declare the script element for require.js yourself, it is rendered by the Aerobatic server platform. If you view the source of an Aerobatic app you'll see something like this:
```html
<head>
	<script src="https://aerobaticapp.com/cockpit.min.js"></script>
</head>
```
The code for require.js is included as part of cockpit.min.js. Rather than a data-main attribute, the main entry point module is declared in the aerobatic.json file.

## aerobatic.json
Aerobatic requires one special config file located in the root of your source directory called aerobatic.json. The JSON structure of the file follows the structure of the [require.js config](http://requirejs.org/docs/api.html#config) object along with some Aerobatic specific settings.

```json
{
  "shim": {
    "angular": {
      "exports": "angular"
    },
    "angular-route": {
      "deps": ["angular"]
    },
    "angular-animate": {
      "deps": ["angular"]
    },
    "angular-bootstrap": {
      "deps": ["angular"]
    },
    "google-analytics": {
      "exports": "ga"
    }
  },
  "paths": {
    "modernizr": ["//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min"],
    "angular": ["//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min"],
    "angular-route": ["//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-route.min"],
    "angular-animate": ["//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-animate.min"],
    "angular-bootstrap": ["//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap.min"],
    "google-analytics": ["//www.google-analytics.com/analytics"]
  },
  "mainModules": {
    "index": "js/app"
  }
}
```
The [shim section](http://requirejs.org/docs/api.html#config-shim) is used for script dependencies that are not natively AMD aware and use the traditional global variable approach. The [paths section](http://requirejs.org/docs/api.html#config-paths) is used to tell RequireJS where to find modules that live outside your app code. Since Aerobatic automatically sets the baseUrl to the root of your app, paths will generally only be used for loading scripts from an external server such as a CDN. In fact it is considered a best practice when building Aerobatic apps to reference your libraries from a CDN whenever possible. [cdnjs](http://www.cdnjs.com/) hosts an extensive set of JavaScript and CSS libraries backed by [Cloudflare](http://www.cloudflare.com/), a highly performant and highly available delivery network. Note that with RequireJS the .js extension is omitted from the paths.

The mainModules key serves tells Aerobatic which module is the main entry point for the application. For an app that doesn't require authentication there will be just one entry point called index. Apps that require authentication will have two keys delared: _authorized_ and _pre-authorized_. 

<i class='icon-book'></i>[More about app authentication](#!/docs/security?section=auth)

## Anatomy of an Aerobatic App
Generally speaking you can structure your code in whatever manner makes the most sense for your app. When using a framework like Angular, it's often a good idea to follow the conventions for that library.

### Sample Source Directory Tree

```bash
|--.gitignore
|--aerobatic.json
|--content
| |--blog
| |--docs
|--css
| |--custom.styl
| |--gallery.styl
| |--theme.css
|--favicon.png
|--font
| |--fontello.css
| |--fontello.eot
| |--fontello.svg
|--images
| |--html5-logo.png
|--js
| |--app.js
| |--controllers
| | |--docsCtrl.js
| | |--mainCtrl.js
|--partials
| |--about.jade
| |--blog.jade
| |--index.jade
| |--layout.jade
|--sitemap.xml
```


### Requiring Assets
Aerobatic makes use of a RequireJS [plugin](http://requirejs.org/docs/plugins.html) called _asset_ to asynchronously load your scripts and stylesheets onto the page. The syntax for plugins is to prefix the path to the module with the plugin name followed by an exclamation point. Here's what it looks like in code:

```javascript
require([
	'angular',
    'asset!partials/layout',
    'asset!partials/index',
  ], function(angular, layoutView, indexView) {
});
```
Note that the _asset!_ prefix is only used when requiring your own modules. For modules that were configured in the paths section of the aerobatic.json file, _angular_ in this case, you can use just the simple name. Once again note that the .js extension is omitted.

CSS assets are also loaded via a RequireJS, only this time with a _css!_ prefix. 

```javascript
require([
	'css!//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
	'css!//fonts.googleapis.com/css?family=Open+Sans:300,400,600,800',
	'css!css/theme',
	'css!css/custom'
])
```

### Asset Pipeline
Aerobatic includes a built-in asset pipeline inspired in part by the [Ruby on Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html). In simulator mode the pipeline will on the fly pre-process a variety of different file types into JavaScript or CSS. Since nothing is written to the file system you don't have to worry about both original source files and compiled versions cluttering up your source directory. Nor do you need to rely on a build tool like [Grunt](gruntjs.com) or [Gulp](http://gulpjs.com) for this - though you are welcome to use them to accomplish other specialized build steps if you need to.

When pushing a new version to production, all the local assets are run through the pipeline before getting compressed and zipped into a .tar file that is uploaded to the cloud. See the [deployments](#!/docs/deployments) article for more details. Aerobatic determines if an asset file needs pre-processing based on its file extension. Here's the list of supported extensions and their associated processor:

| extension | processor |
| --------- | --------- |
| .coffee | [CoffeeScript]() |
| .jade   | [Jade](http://jade-lang.com) |
| .styl	   | [Stylus](http://learnboost.github.io/stylus/) (includes [nib](http://visionmedia.github.io/nib/)) |
| .less	   | [LESS](http://lesscss.org/) |
| .sass   | [Sass](http://sass-lang.com/) |
| .md     | [Markdown](https://help.github.com/articles/github-flavored-markdown) (GitHub flavored) |

With Aerobatic all assets are downloaded from the CloudFront CDN which has a different domain than where the actual app is hosted. For JavaScript and CSS, the browser will happily allow cross domain requests. However most browsers will not by default allow HTML templates to be loaded cross domain. To get around this Aerobatic loads HTML templates as strings wrapped in a define function and returned as a JavaScript. The pipeline automatically does this, developers still author their html just as they normally would in a .html or .jade file. Here's what a compiled HTML template looks like:

```javascript
define([],function(){return'<div class="page"><section class="page"><h1 class="noSubtitle">Blog</h1><div class="container"><h2>Coming Soon</h2></div></section></div>'});
```

### Markdown
For apps with light to moderately heavy amounts of content, authoring static markdown files that live within your app is a simple solution. Code highlighting is supported via [highlight.js](http://highlightjs.org/). To activate the highlighting, you just need to require in the highlight.js css.

```js
require(['css!//yandex.st/highlightjs/8.0/styles/default.min.css']);
```
For content heavy sites with contributors that are not developers, a better solution would be to host the content outside the app and load it via an API call. Storing markdown files in a GitHub repository and loading them via the [GitHub API](https://developer.github.com/v3/) would be one option.
