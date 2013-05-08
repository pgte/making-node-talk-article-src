var reconnect = require('reconnect');

var port = 3000;
var host = 'localhost';

var reconnector =
reconnect(function(stream) {
  stream.setEncoding('utf8');

  var interval = setInterval(function() {
    var date = (new Date).toString();
    stream.write('It\'s ' + date);
  }, 1000);


  stream.on('readable', function() {
    var chunk;
    while(chunk = stream.read()) {
      console.log('got from server: %j', chunk);
    }
  });

  stream.once('end', function() {
    clearInterval(interval);
  });

}).connect(port, host);

setTimeout(function() {
  reconnector.reconnect = false;
  reconnector.disconnect();
}, 5000);
