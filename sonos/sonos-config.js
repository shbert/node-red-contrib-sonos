module.exports = function(RED) {
    function SonosPlayerNode(n) {
        RED.nodes.createNode(this,n);
        this.ipaddress = n.ipaddress;
        this.port = n.port;
    }

    RED.nodes.registerType("sonos-player", SonosPlayerNode);
}