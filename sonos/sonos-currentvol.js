// Sonos Current Track node
var sonos = require('sonos');

module.exports = function(RED) {
    'use strict';

    function Node(n) {

        RED.nodes.createNode(this,n);

	      var playnode = RED.nodes.getNode(n.playnode);
	      this.client = new sonos.Sonos(playnode.ipaddress);

	      var node = this;

        this.on('input', function (msg) {
            var payload = typeof msg.payload === 'object' ? msg.payload : {};

			         node.client.getVolume().then((volume) => {
                 msg.payload = volume;
                 node.send(msg);
                 node.log(JSON.stringify(volume));
               }).catch((err) => {
					node.log(JSON.stringify(err));
			});
		});

	}

    RED.nodes.registerType('sonos-currentvol', Node);
};
