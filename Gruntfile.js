module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
          sourceMap: true,
          presets: ['env']
      },
      dist: {
          files: {
              'public/js/script.js': 'src/js/script.js'
          }
      }
    },
    sass: {
      dist: {
        options:{
          
        },
        files: {
          'public/css/main.css' : 'src/scss/main.scss'
        }
      }
    },
    postcss: {
      options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
            require('cssnano')() // minify the result
          ]
      },
      dist: {
          src: 'public/css/main.css'
      }
    },
    watch: {
      css: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass', 'postcss:dist']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['babel']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('default',['watch']);
  grunt.registerTask('build',['sass','postcss', 'babel'] )
}