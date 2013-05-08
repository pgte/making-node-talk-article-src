var net = require('net');

var port = 3000;
var host = 'localhost';

var stream = net.connect(port, host);
stream.setEncoding('utf8');

var interval = setInterval(function() {
  var date = (new Date).toString();
  stream.write('It\'s ' + date);
}, 1000);

setTimeout(function() {
  clearInterval(interval);
  stream.end();
}, 5000);

stream.on('readable', function() {
  var chunk;
  while(chunk = stream.read()) {
    console.log('got from server: %j', chunk);
  }
});