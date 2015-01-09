'use strict';


define(function(require) {

  var chai = require('chai');
  var Game = require('game');

  var should = chai.should();

  mocha.setup('bdd');
  describe("model/game", function() {

    it("Constructor", function() {
      var game = new Game(1);
      game.it.should.equal(1);
    });

  });

});
