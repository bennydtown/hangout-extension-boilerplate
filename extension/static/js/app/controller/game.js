'use strict';

// The game controls for playing Tag

define(function(require) {

  var jquery = require('jquery');

  var self;

  /**
   * Draw game control if I'm Not It
   *
   * @param {String} itParticipantId - the ID of the hangout participant
   *                                   who is it
   */
  function drawNotIt(itParticipantId) {
    return jquery("<div/>").text(
      gapi.hangout.getParticipantById(itParticipantId)
      .person.displayName + " is It!"
    );
  }

  /**
   * Draw game control if I'm It
   */
  function drawIt(tagCallback) {
    var select = $("<select/>").attr("name", "players").attr("id",
      "players");
    _.each(gapi.hangout.getParticipants(), function(participant) {
      select.append($("<option/>").attr("value", participant.id).text(
        participant.person.displayName));
    });

    return jquery("<div/>").append(
      jquery("<div/>").text("You're It!")
    ).append(jquery("<form/>").append(select).append(
      jquery("<input/>").attr("type", "button")
      .attr("value", "Tag!").click(tagCallback)
    ));
  }

  function Game(view, game, tagCallback) {
    self = this;
    this.view = view;
    this.game = game;
    this.tagCallback = tagCallback;
  }

  Game.prototype = {

    tagPlayer: function(taggedPlayerId) {
      var localParticipant = gapi.hangout.getLocalParticipant();
      if (this.game.it != localParticipant.id) {
        console.log("Error: only the player who is already It can tag");
        return false;
      }
      this.game.it = taggedPlayerId;
      if (this.tagCallback) {
        this.tagCallback(
          localParticipant.person.displayName + " tagged " + gapi.hangout.getParticipantById(
            taggedPlayerId).person.displayName
        );
      }
      this.game.save();
      return true;
    },

    render: function() {
      this.view.empty();
      if (this.game.it !== gapi.hangout.getLocalParticipant().id) {
        this.view.append(drawNotIt(this.game.it));
      } else {
        this.view.append(drawIt(function() {
          self.tagPlayer(
            jquery("#players").val()
          );
        }));
      }
    }

  };

  return Game;

});
