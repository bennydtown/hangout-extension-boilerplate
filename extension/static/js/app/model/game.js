'use strict';

define(function(require) {
  var _BaseModel = require('_baseModel');

  function Game(firstPlayerId) {
    this.attributes = {
      it: firstPlayerId, // player.id for whoever is It!
    };
    this.gapiDataKey = "game";

    _.extend(this, _BaseModel);
    this._initBase();
  };

  return Game;
});
