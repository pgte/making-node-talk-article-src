var net = require('net');
var server = net.createServer();
var port = 3000;
server.listen(port);
server.once('listening', function() {
  console.log('Server listening on port %d', port);
});

var duplexEmitter = require('duplex-emitter');

server.on('connection', function(stream) {
  var peer = duplexEmitter(stream);

  var interval =
  setInterval(function() {
    peer.emit('ping', Date.now());
  }, 1000);

  peer.on('pong', function(myTimestamp, hisTimestamp) {
    console.log('got pong from peer with args %d and %d', myTimestamp, hisTimestamp);
  });
});