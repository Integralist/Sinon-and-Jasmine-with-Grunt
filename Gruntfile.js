module.exports = function (grunt) {

    /*
        Grunt set-up:
            npm install -g grunt-cli
                /usr/local/share/npm/bin/grunt -> /usr/local/share/npm/lib/node_modules/grunt-cli/bin/grunt
            npm install -g grunt-init
            npm init (creates a package.json file)

        Requirements: the following commands should be run on every project + the `--save-dev` flag updates the package.json file with the dependency name
            npm install grunt --save-dev
                npm install grunt@VERSION --save-dev
                npm install grunt@devel --save-dev
            npm install grunt-contrib-watch --save-dev
            npm install grunt-contrib-jshint --save-dev
            npm install grunt-contrib-jasmine --save-dev
    */

    // Project configuration.
    grunt.initConfig({

        // Store your Package file so you can reference its specific data whenever necessary
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            /*
                Note:
                In case there is a /release/ directory found, we don't want to run tests on that 
                so we use the ! (bang) operator to ignore the specified directory
            */
            src: ['app/**/*.js', '!app/release/**'],
            options: {
                specs: 'specs/**/*Spec.js',
                helpers: ['lib/jquery.js', 'lib/sinon.js', 'specs/helpers/*Helper.js']
            }
        },

        jshint: {
            /*
                Note:
                In case there is a /release/ directory found, we don't want to lint that 
                so we use the ! (bang) operator to ignore the specified directory
            */
            files: ['Gruntfile.js', 'app/**/*.js', '!app/release/**', 'modules/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,

                globals: {
                    module: true,
                    require: true,
                    requirejs: true,
                    jQuery: true,
                    console: true,
                    define: true
                }
            }
        },

        // Run: `grunt watch` from command line for this section to take effect
        watch: {
            files: ['<%= jshint.files %>', '<%= jasmine.src %>'],
            tasks: 'default'
        }

    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default Task
    grunt.registerTask('default', ['jshint', 'jasmine']);

};
