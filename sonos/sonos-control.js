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
			
			var mode_to_set = "play";

			if (payload.mode) {
				switch (payload.mode) {
					case "pause":
						mode_to_set = "pause";
						node.log("pause requested");
						break;
					case "stop":
						mode_to_set = "stop";
						node.log("stop requested");
						break;
					case "play":
						mode_to_set = "play";
						node.log("play requested");
						break;
				}
			}
			if (payload.track) {
				switch (payload.track) {
					case "next":	
						client.next(function(err, result) {
							msg.payload = result;
							node.log(JSON.stringify(err));
							//node.log(JSON.stringify(result));
							node.log("next track requested");
						});
						break;
					case "previous":
						client.previous(function(err, result) {
							msg.payload = result;
							node.log(JSON.stringify(err));
							//node.log(JSON.stringify(result));
							node.log("previous track requested");
						});
						break;
				}
			}
			
			switch (mode_to_set) {
				case "pause":
					client.pause(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("paused");
						node.status({fill:"red",shape:"dot",text:"paused"});
					});
					break;
				case "stop":
					client.stop(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("stopped");
						node.status({fill:"red",shape:"dot",text:"stopped"});
					});
					break;
				default:
					client.play(function(err, result) {
						msg.payload = result;
						node.log(JSON.stringify(err));
						//node.log(JSON.stringify(result));
						node.log("playing");
						node.status({fill:"green",shape:"dot",text:"playing"});
					});
			}
			
			node.send(msg);
        });
    }

    RED.nodes.registerType('sonos-control', Node);
};