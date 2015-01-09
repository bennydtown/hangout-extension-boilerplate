'use strict';

define(function(require) {

  var chai = require('chai');
  var Game = require('game');
  var GameController = require('gameController');
  var jquery = require('jquery');

  var should = chai.should();
  var expect = chai.expect;

  mocha.setup('bdd');

  describe("controller/game", function() {

    it("constructor", function() {
      var view = jquery("<div/>").attr("id", "gameView");
      var game = new Game(1);
      var gameController = new GameController(view, game);
      gameController.view.attr("id").should.equal("gameView");
      gameController.game.it.should.equal(1);
    });

    describe("tagPlayer", function() {

      it("success", function() {
        var view = jquery("<div/>").attr("id", "gameView");
        var game = new Game(1);
        var gameController = new GameController(view, game, function() {});
        var result = gameController.tagPlayer(2);
        result.should.be.true();
      });

      it("failed (I'm not it)", function() {
        var view = jquery("<div/>").attr("id", "gameView");
        var game = new Game(1);
        var gameController = new GameController(view, game, function() {});
        game.it = 2;
        var result = gameController.tagPlayer(2);
        result.should.be.false();
      });

    });

    describe("render", function() {

      it("I'm It", function() {
        var view = jquery("<div/>").attr("id", "gameView");
        var game = new Game(1);
        var gameController = new GameController(view, game);
        gameController.render();
        view.children(":first").children(":first").text().should.equal(
          "You're It!");
      });

      it("I'm not It", function() {
        var view = jquery("<div/>").attr("id", "gameView");
        var game = new Game(1);
        var gameController = new GameController(view, game);
        game.it = 2;
        gameController.render();
        view.text().should.equal("Santa Claus is It!");
      });

    });

  });

});
