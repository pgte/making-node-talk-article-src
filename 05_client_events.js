var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var port = 3000;
var host = 'localhost';

var reconnector =
reconnect(function(stream) {
  var peer = duplexEmitter(stream);

  peer.on('ping', function(timestamp) {
    console.log('got ping from peer %d', timestamp);
    peer.emit('pong', timestamp, Date.now());
  });

}).connect(port, host);