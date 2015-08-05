/*global module:false*/
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true
        , laxcomma: true
        , eqeqeq: true
        , immed: true
        , latedef: true
        , newcap: true
        , noarg: true
        , sub: true
        , unused: true
        , boss: true
        , eqnull: true
        , browser: true
        , asi: true
        , globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>'
        , tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>'
        , tasks: 'default'
      }
    },
    uglify: {
      dist: {
        src: 'src/ActiveLayers.js'
        , dest: 'dist/<%= pkg.name%>.min.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-qunit')

  grunt.registerTask('default', ['jshint', 'qunit', 'uglify'])

}
