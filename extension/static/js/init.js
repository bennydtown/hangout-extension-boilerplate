'use strict';

require.config({
  paths: {
    'chai': 'lib/chai-1.10.0',
    'jquery': 'lib/jquery-1.11.1-min',
    'underscore': 'lib/underscore-1.7.0-min',
    'blanket': 'lib/blanket-min',
    'mocha-blanket': 'lib/mocha-blanket',

    'main': 'app/main',
    'logController': 'app/controller/log',
    'gameController': 'app/controller/game',
    '_baseModel': 'app/model/_baseModel',
    'game': 'app/model/game',
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

requirejs(['main']);
