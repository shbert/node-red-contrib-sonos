# SONOS for NodeRED

A set of nodes to control SONOS via NodeRED. Uses the sonos [NPM Module](https://github.com/bencevans/node-sonos).

Currently very early alpha version ... development ongoing.

## Installation

`npm install node-red-contrib-sonos`

## Implemented Nodes

Play - just starts playing the current song in the corresponding Sonos player

```
[{"id":"8daf587d.795bd8","type":"sonos-play","z":"cf7e64ed.43eed8","playnode":"","name":"","x":483,"y":134,"wires":[]},{"id":"485f55fe.867e4c","type":"inject","z":"cf7e64ed.43eed8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":250,"y":129,"wires":[["8daf587d.795bd8"]]}]
```
