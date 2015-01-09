'use strict';

define(function(require) {

  var Game = require('game');
  var GameController = require('gameController');
  var jquery = require('jquery');
  var LogController = require('logController');

  var game = null;
  var gameController = null;
  var logController = new LogController(jquery("#log"));

  function onMessageReceived(event) {
    var participants = gapi.hangout.getParticipants();
    for (var participantIndex = 0; participantIndex < participants.length; participantIndex++) {
      if (participants[participantIndex].id == event.senderId) {
        logController.log(participants[participantIndex].person, event.message);
        break;
      }
    }
  }

  function onParticipantsAdded(event) {
    var participants = event.addedParticipants || [];
    for (var i = 0; i < participants.length; i++) {
      logController.log(participants[i].person,
        "joined the table");
    }
    onStateChanged();
  }


  function onParticipantsRemoved(event) {
    var participants =
      event.disabledParticipants ||
      event.removedParticipants || [];
    for (var i = 0; i < participants.length; i++) {
      logController.log(participants[i].person,
        "left the table");
    }
    onStateChanged();
  }

  function onStateChanged() {
    game.load();
    gameController.render();
  }

  function onExtensionReady() {
    if (!hangoutApiReady) {
      // Hangout API is not yet ready... wait one second and retry
      setTimeout(onExtensionReady, 1000);
      return;
    }

    var localPerson = gapi.hangout.getLocalParticipant().person;
    logController.log(localPerson, "joined the game");

    gapi.hangout.data.onStateChanged.add(onStateChanged);
    gapi.hangout.onParticipantsAdded.add(onParticipantsAdded);
    gapi.hangout.onParticipantsRemoved.add(onParticipantsRemoved);
    gapi.hangout.data.onMessageReceived.add(onMessageReceived);

    if (gapi.hangout.data.getValue('game') === undefined) {
      game = new Game(gapi.hangout.getLocalParticipant().id);
      game.save();
    } else {
      game = new Game();
      game.load();
    }
    gameController = new GameController(
      jquery("#gameControls"), game, logController.sendAndLog
    );

    onStateChanged();
  }

  jquery(document).ready(onExtensionReady);

});
