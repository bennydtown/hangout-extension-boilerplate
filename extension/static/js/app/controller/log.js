'use strict';

define(function(require) {

  var self;

  function Log(view) {
    self = this;
    this.view = view;
  }

  Log.prototype = {

    sendAndLog: function(message) {
      gapi.hangout.data.sendMessage(message);
      self.log(gapi.hangout.getLocalParticipant().person, message);
    },

    log: function(person, message) {
      var displayName = person.displayName;
      var displayNameClass = "displayName";
      if (person.id == gapi.hangout.getLocalParticipant().person.id) {
        displayName = "You";
        displayNameClass += " me";
      }
      var logDate = new Date();
      this.view.append($("<div/>")
        .append($("<span/>").addClass("time").text(logDate.getHours() + ":" +
          ("0" + logDate.getMinutes()).slice(-2)))
        .append($("<span/>").addClass(displayNameClass).text(displayName))
        .append($("<span/>").addClass("message").html(message))
      );
      this.view.scrollTop(this.view[0].scrollHeight);
    }

  };

  return Log;

});
