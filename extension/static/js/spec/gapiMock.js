'use strict';

var hangoutApiReady = true;

var gapi = {
  _dataStore: {},
  lastMessageSent: null,
  participants: [{
    id: 1,
    person: {
      id: 101,
      displayName: 'Ben Smith'
    }
  }, {
    id: 2,
    person: {
      id: 102,
      displayName: 'Santa Claus'
    }
  }, {
    id: 3,
    person: {
      id: 103,
      displayName: 'Tooth Fairy'
    }
  }, {
    id: 4,
    person: {
      id: 104,
      displayName: 'Chicka'
    }
  }, {
    id: 5,
    person: {
      id: 105,
      displayName: 'Wally'
    }
  }, {
    id: 6,
    person: {
      id: 106,
      displayName: 'Monkey Pants'
    }
  }],
  hangout: {
    data: {
      getValue: function(key) {
        return gapi._dataStore[key];
      },
      setValue: function(key, value) {
        gapi._dataStore[key] = value;
      },
      submitDelta: function(delta) {
        for (var key in delta) {
          gapi._dataStore[key] = delta[key];
        }
      },
      sendMessage: function(message) {
        gapi.lastMessageSent = message;
      }
    },
    getLocalParticipant: function() {
      return gapi.participants[0];
    },
    getParticipantById: function(participantId) {
      for (var p = 0; p < gapi.participants.length; p++) {
        if (gapi.participants[p].id === participantId) {
          return gapi.participants[p];
        }
      }
      return null;
    },
    getParticipants: function() {
      return gapi.participants;
    }
  }
};
