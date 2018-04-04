module.exports = function gruntFn(grunt) {
  grunt.initConfig({
    eslint: {
      src: ['src/**/*.js'],
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env'],
      },
      build_dev: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'build_dev/',
      },
      build: {
        files: {
          'build/functions.js': 'src/functions.js',
        },
      },
    },
    watch: {
      files: ['<%= eslint.src %>'],
      tasks: ['babel'],
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['babel:build_dev']);
  grunt.registerTask('build', ['babel:build']);
};
