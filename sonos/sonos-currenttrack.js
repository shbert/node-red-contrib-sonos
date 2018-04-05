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

    this.on('input', function (msg) {
            var payload = typeof msg.payload === 'object' ? msg.payload : {};

      node.client.currentTrack().then((track) => {
			//node.client.currentTrack(function (err, track) {
				msg.payload = track;
				node.send(msg);
				//if (err) {
				//	node.log(JSON.stringify(err));
				//}
				node.log(JSON.stringify(track));
			}).catch((err) => {
        node.log(JSON.stringify(err));
      });

		});

	}

    RED.nodes.registerType('sonos-currenttrack', Node);
};
