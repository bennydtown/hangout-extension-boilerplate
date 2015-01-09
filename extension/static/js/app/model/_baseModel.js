'use strict';

// A model class can marshall itself as a dictionary

define(function(require) {

  var _ = require('underscore');

  return {

    _initBase: function() {
      _.extend(this, this.attributes);
    },


    toDictionary: function() {
      var thisObject = {};
      for (var attribute in this.attributes) {
        thisObject[attribute] = this[attribute];
      }
      return thisObject;
    },

    load: function() {
      // Load from shared data
      _.extend(this, JSON.parse(gapi.hangout.data.getValue(this.gapiDataKey)));
    },

    save: function() {
      var delta = {};
      delta[this.gapiDataKey] = JSON.stringify(this.toDictionary());
      gapi.hangout.data.submitDelta(delta);
    }

  };

});
