// Sonos Play Node - control play/pause/stop function
var sonos = require('sonos');

module.exports = function(RED) {
    'use strict';

    function Node(n) {
      
        RED.nodes.createNode(this,n);

        var node = this;
        
        this.on('input', function (msg) {
            
            var playnode = RED.nodes.getNode(n.playnode);            
            var payload = typeof msg.payload === 'object' ? msg.payload : {};
			var client = new sonos.Sonos(playnode.ipaddress);
			
			switch (n.mode) {
				case "pause":
					client.pause(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("paused");
					});
					break;
				case "stop":
					client.stop(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("stopped");
					});
					break;
				default:
					client.play(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("playing");
					});
			}
			
			node.send(msg);
        });
    }

    RED.nodes.registerType('sonos-control', Node);
};