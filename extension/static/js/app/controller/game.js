'use strict';

// The game controls for playing Tag

define(function(require) {

  var jquery = require('jquery');

  var self;

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
      if (this.tagCallback) this.tagCallback(
        localParticipant.person.displayName + " tagged " + gapi.hangout.getParticipantById(
          taggedPlayerId).person.displayName
      );
      this.game.save();
      return true;
    },

    render: function() {
      this.view.empty();
      var localParticipantId = gapi.hangout.getLocalParticipant().id;
      if (this.game.it !== localParticipantId) {
        // I'm not It - Show me who it
        this.view
          .append(jquery("<div/>").text(
            gapi.hangout.getParticipantById(this.game.it).person.displayName +
            " is It!"
          ));

        return;
      }

      // I'm It - show me controls to tag somebody
      var select = $("<select/>").attr("name", "players").attr("id",
        "players");
      _.each(gapi.hangout.getParticipants(), function(participant) {
        select.append($("<option/>").attr("value", participant.id).text(
          participant.person.displayName));
      });

      this.view.append(jquery("<div/>").text("You're It!"))
        .append(jquery("<form/>").append(select).append(
          jquery("<input/>").attr("type", "button")
          .attr("value", "Tag!").click(function(e) {
            this.tagPlayer(
              jquery("#players").val()
            );
          })
        ));

    }

  };

  return Game;

});
