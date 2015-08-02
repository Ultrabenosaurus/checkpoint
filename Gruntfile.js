/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      full: {
        src: [
          'src/sizer.js',
          'src/finder.js',
          'src/calculator.js',
          'src/painter.js',
          'src/scroller.js',
          'lib/scrolling-0.1.0/scrolling.js',
          'src/main.js',
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      outline: {
        src: [
          'src/sizer.js',
          'src/finder.js',
          'src/calculator.js',
          'src/painter.js',
          'src/main.js',
        ],
        dest: 'dist/<%= pkg.name %>-outline.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      full: {
        src: '<%= concat.full.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      outline: {
        src: '<%= concat.outline.dest %>',
        dest: 'dist/<%= pkg.name %>-outline.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('build-full', ['concat:full', 'uglify:full']);
  grunt.registerTask('build-outline', ['concat:outline', 'uglify:outline']);

};
