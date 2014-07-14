module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    favicons: {
      options: {
        appleTouchBackgroundColor: "#ffffff",
        html: 'index.html',
        HTMLPrefix: 'favicons/',
        windowsTile: false
      },
      icons: {
        src: 'favicon.png',
        dest: 'favicons'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/build.js']
        }
      }
    },
    jade: {
      compile: {
        options: {
        },
        files: {
          "index.html": ["index.jade"]
        }
      },
      partials: {
        options: {
          client: true
        },
        files: {
          "dist/partials.min.js": ["partials/*.jade"]
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
          'tmp/app.css': ['css/theme.css', 'css/custom.styl'] // compile and concat into single file
        }
      }
    },
    cssmin: {
      minify: {
        src: ['tmp/app.css', 'css/github-markdown.css'],
        dest: 'dist/app.min.css'
      }
    },
    ngmin: {
      target: {
        src: ['js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      index: {
        files: ['index.jade'],
        tasks: ['jade']
      },
      stylus: {
        files: ['css/*.styl', 'css/*.css'],
        tasks: ['stylus', 'cssmin', 'clean']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint']
      },
      partials: {
        files: ['partials/*.jade'],
        tasks: ['jade:partials']
      },
      markdown: {
        files: ['content/**/*.md'],
        tasks: ['markdown']
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        src: ['index.html', 'dist/**/*.*', 'favicons/*', 'font/*', 'images/*.*', 'sitemap.xml']
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      },
      snapshot: {
        all: {
          timeout: 2000
        }
      }
    },
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'content/**/*.md',
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },
  });

  // Specify the sync arg to avoid blocking the watch
  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'jade', 'stylus', 'cssmin', 'ngmin', 'uglify', 'markdown', 'clean']);
  grunt.registerTask('snapshot', ['aerobatic:snapshot']);

  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadTasks('../grunt-aerobatic/tasks');
  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
