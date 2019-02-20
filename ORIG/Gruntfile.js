module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
        dist: {
            options: {
              includePaths: ['foundation/scss'],
              outputStyle: 'compressed'
              //'compressed'
            },
            files: {
              'dist/app.min.css': 'scss/app.scss'
            }
        }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'js/gridFunctions.js',
          'js/siteFunctions.js',
          'levels/levelConfig.js'               
        ],
        dest: 'js/app.js',
      },
    },

    uglify: {
      dist: {
        options: {
          beautify: false
        },
        files: {
          'dist/modernizr.min.js' : ['foundation/js/vendor/custom.modernizr.js'],
          'dist/jquery.min.js' : ['foundation/js/vendor/jquery.js'],
          'dist/fastclick.min.js' : ['foundation/js/vendor/fastclick.js'],
          'dist/app.min.js' : ['js/app.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },      

      sass: {
        files: ['scss**/*.scss', 'levels/*.scss'],
        tasks: ['sass']
      },

      grunt: { files: ['Gruntfile.js'] },

      js: {
        files: ['js**/*.js', 'levels/*.js'],
        tasks: ['concat', 'uglify']
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

}