require('dotenv').config();

module.exports = function(grunt) {
  let dbName;
// check the environment and create a DB connection
  if (process.env.NODE_ENV === 'test') {
    dbName = process.env.DB_NAME_TEST;
  } else {
    dbName = process.env.DB_NAME;
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        
        src: ['server/test/**/*.js', 'client/test/**/*.js']
      }
    },

    pgcreatedb: {
      default: {
        connection: {
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          host: process.env.DB_HOSTNAME,
          port: process.env.DB_PORT,
          database: 'template1'
        },
        name: dbName
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
