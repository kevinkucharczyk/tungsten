/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/font-awesome/scss'
      ]
    }
  });

  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts'
  });

  return app.toTree();
};
