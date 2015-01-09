'use strict';

define(function(require) {

  var chai = require('chai');
  var LogController = require('logController');
  var jquery = require('jquery');

  var should = chai.should();
  var expect = chai.expect;

  mocha.setup('bdd');
  describe("controller/log", function() {

    it("constructor", function() {
      var view = jquery("<div/>").attr("id", "logView");
      var log = new LogController(view);
      log.view.attr("id").should.equal("logView");
    });

    it("sendAndLog", function() {
      var view = jquery("<div/>").attr("id", "logView");
      var log = new LogController(view);
      log.sendAndLog("Test Message");
      gapi.lastMessageSent.should.equal("Test Message");
    });

    describe("log", function() {

      it("message from me", function() {
        var view = jquery("<div/>").attr("id", "logView");
        var log = new LogController(view);
        log.log(gapi.hangout.getLocalParticipant().person,
          "Message from Me!");
      });

      it("message from somebody else", function() {
        var view = jquery("<div/>").attr("id", "logView");
        var log = new LogController(view);
        log.log(gapi.hangout.getParticipantById(2).person,
          "Message from Somebody else!");
      });

    });

  });

});
