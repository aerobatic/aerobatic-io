module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/build.js', 'tmp/templates.js'],
          'dist/components.min.js': [
            'node_modules/underscore.string/lib/underscore.string.js',
            'node_modules/angular-bootstrap/ui-bootstrap.js',
            'node_modules/angular-scroll/angular-scroll.js',
            'node_modules/angular-aerobatic/angular-aerobatic.js'
          ]
        }
      }
    },
    html2js: {
      options: {
        base: 'app',
        module: 'templates',
        singleModule: true
      },
      main: {
        src: ['app/partials/*.jade'],
        dest: 'tmp/templates.js'
      },
    },
    jade: {
      compile: {
        files: {
          "dist/index.html": ["app/index.jade"]
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['css'],
          'include css': true
        },
        files: {
          'tmp/app.css': ['app/css/theme.css', 'app/css/custom.styl'] // compile and concat into single file
        }
      }
    },
    cssmin: {
      minify: {
        src: ['tmp/app.css', 'app/css/github-markdown.css'],
        dest: 'dist/css/app.min.css'
      }
    },
    ngAnnotate: {
      target: {
        src: ['app/js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'robots.txt', dest: 'dist/'},
          {src: 'sitemap.xml', dest: 'dist/'},
          {cwd: 'app', src: ['images/**'], dest: 'dist/', expand: true},
          {cwd: 'app', src: ['favicons/**'], dest: 'dist/', expand: true},
          {cwd: 'app', src: ['font/**'], dest: 'dist/', expand: true},
        ]
      }
    },
    clean: ['dist', 'tmp']
  });

  // Specify the sync arg to avoid blocking the watch

  grunt.registerTask('build', ['clean', 'jshint', 'copy:dist', 'html2js', 'jade', 'stylus', 'cssmin', 'ngAnnotate', 'uglify']);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
};
