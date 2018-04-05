module.exports = function gruntFn(grunt) {
  grunt.initConfig({
    eslint: {
      src: ['src/**/*.js'],
    },
    babel: {
      options: {
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
      files: ['src/**/*.*'],
      tasks: ['clean:build_dev', 'babel:build_dev', 'copy:build_dev'],
    },
    clean: {
      build_dev: ['build_dev'],
      build: ['build'],
    },
    copy: {
      build_dev: {
        files: [{
          cwd: 'src/',
          src: ['**/*.html', '**/*.css'],
          dest: 'build_dev/',
          expand: true,
        }, {
          src: ['manifest.json', 'images/stock_mail.png', 'lib/**/*.js'],
          dest: 'build_dev/',
          expand: true,
        }],
      },
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:build_dev', 'babel:build_dev', 'copy:build_dev']);
  grunt.registerTask('build', ['clean:build', 'babel:build']);
};
