// Sonos Queue Song
const { Sonos, Helpers } = require("sonos");
var Promise = require("promise");

module.exports = function(RED) {
  "use strict";

  function Node(n) {
    RED.nodes.createNode(this, n);

    var playnode = RED.nodes.getNode(n.playnode);
    this.client = new Sonos(playnode.ipaddress);

    this.songuri = n.songuri;
    this.position = n.position;
    if (this.position === "empty") {
      this.position = "";
    }
    this.positioninqueue = n.positioninqueue;

    var node = this;

    this.on("input", function(msg) {
      var payload = typeof msg.payload === "object" ? msg.payload : {};

      var _songuri = node.songuri;
      if (payload.songuri) {
        _songuri = payload.songuri;
      }

      if (node.position === "next" || payload.position === "next") {
        node.log("Queueing URI next: " + _songuri);
        node.client
          .queueNext(Helpers.GenerateLocalMetadata(_songuri, ''))
          .then(result => {
            //node.client.queueNext(_songuri, function (err, result) {
            msg.payload = result;
            node.send(msg);
            //if (err) {
            //	node.log(JSON.stringify(err));
            //}
            node.log(JSON.stringify(result));
          })
          .catch(err => {
            node.log(JSON.stringify(err));
          });
      } else if (
        node.position === "directplay" ||
        payload.position === "directplay"
      ) {
        node.log("Direct play URI: " + _songuri);
        //.play(_songuri)
        node.client
          .setAVTransportURI(_songuri)
          .then(result => {
            //node.client.play(_songuri, function (err, result) {
            msg.payload = result;
            node.send(msg);
            //if (err) {
            //	node.log(JSON.stringify(err));
            //}
            node.log(JSON.stringify(result));
          })
          .catch(err => {
            node.log(JSON.stringify(err));
          });
      } else if (
        node.position === "tuneinradio" ||
        payload.position === "tuneinradio"
      ) {
        node.log("Play TuneIn Radio: " + _songuri);
        node.client
          .playTuneinRadio(_songuri)
          .then(result => {
            //node.client.playTuneinRadio(_songuri, function (err, result) {
            msg.payload = result;
            node.send(msg);
            //if (err) {
            //	node.log(JSON.stringify(err));
            //}
            node.log(JSON.stringify(result));
          })
          .catch(err => {
            node.log(JSON.stringify(err));
          });
      } else {
        // Default is queueing to the end of a queue
        var set_position = 0;
        // Evaluate different inputs (json payload preferred, node option second, default third)
        if (payload.position) {
          set_position = payload.position;
        } else if (node.positioninqueue) {
          if (isNaN(node.positioninqueue) == false) {
            set_position = parseInt(node.positioninqueue, 10);
          }
        }
        // Queue song now
        node.log("Queuing at " + set_position + " URI: " + _songuri);
        node.client
          .queue(_songuri, set_position)
          .then(result => {
            //node.client.queue(_songuri, set_position, function (err, result) {
            msg.payload = result;
            node.send(msg);
            //if (err) {
            //	node.log(JSON.stringify(err));
            //}
            node.log(JSON.stringify(result));
          })
          .catch(err => {
            node.log(JSON.stringify(err));
          });
      }
    });
  }

  RED.nodes.registerType("sonos-queue", Node);
};
