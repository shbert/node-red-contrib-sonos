// Sonos Current Track node
var sonos = require('sonos');
var Promise = require('promise');

module.exports = function(RED) {
    'use strict';

    function Node(n) {

    RED.nodes.createNode(this,n);

		var playnode = RED.nodes.getNode(n.playnode);
		this.client = new sonos.Sonos(playnode.ipaddress);

		var node = this;
    node.client.deviceDescription().then(devDesc => {
      node.log("Master node: "+ devDesc.roomName);
    });

    this.on('input', function (msg) {
      var payload = typeof msg.payload === 'object' ? msg.payload : {};

      if (payload.action === "join") {
        var tmpClient = new sonos.Sonos(payload.otherNode);

        this.client.deviceDescription().then(devDesc => {
          tmpClient.joinGroup(devDesc.roomName).then(success => {
            node.log('Joining '+payload.otherNode+' to '+devDesc.roomName+' was '+(success ? 'successful' : 'unsuccessful'));
          }).catch(err => {
            node.error('Failed while joining device', err);
          });
        });
      }
      else if (payload.action === "leave") {
        var tmpClient = new sonos.Sonos(payload.otherNode);
        tmpClient.leaveGroup().then(success => {
          node.log('Leaving group from ' + playnode.ipaddress + ' was ' + (success ? 'successful' : 'unsuccessful'));
        }).catch(err => {
          node.error('Failed to leave group', err);
        });
      }
      else {
        node.log("undefined grouping action.");
      }

		});

	}

  RED.nodes.registerType('sonos-group', Node);
};
