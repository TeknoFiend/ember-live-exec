/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-live-exec',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var options = (app.options && app.options.emberLiveExec) || {};

    if( options.importCss !== false ) { options.importCss = true; }

    if (options.importCss) {
      app.import('vendor/ember-live-exec.css');
    }
  }
};
