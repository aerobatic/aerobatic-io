module.exports = function(grunt) {
  grunt.initConfig({
    favicons: {
      options: {
        appleTouchBackgroundColor: "#ffffff"
      },
      icons: {
        src: 'favicon.png',
        dest: 'favicons'
      }
    },
  });

  grunt.loadNpmTasks('grunt-favicons');
};
