module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      src: ['src/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint']);
};
