/*
 * grunt-npm-install
 * https://github.com/iclanzan/grunt-npm-install
 *
 * Copyright (c) 2013 Sorin Iclanzan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var npm = require('npm');

  grunt.registerTask('npm-install', 'Install npm modules.', function () {
    var modules = Array.prototype.slice.call(arguments);
    var done = this.async();

    var options = this.options({
      cwd: ''
    });

    function errorHandler(err) {
      if (err) {
        grunt.log.error(err);
      }
      done();
    }

    npm.load(function (err, npm) {
      if (err) {
        grunt.log.error(err);
        return;
      }

      if (options.cwd) {
        npm.prefix = options.cwd;
      }

      npm.commands.install(modules, errorHandler);
    });
  });
};
