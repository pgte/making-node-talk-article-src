var net = require('net');

var server = net.createServer();

var port = 3000;

server.listen(port);

server.once('listening', function() {
  console.log('Server listening on port %d', port);
});

server.on('connection', function(stream) {
  stream.pipe(stream);
});