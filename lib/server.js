'use strict';

var http = require('http');
var path = require('path');

var server = http.createServer(function(req, res) {

  if (req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var date = new Date();
    res.write(JSON.stringify({time: date.getHours() + ': ' +
      date.getMinutes() + ': ' + date.getSeconds()}));
    res.end();
    return;
  }

  //Is there a better way of doing this? It feels like there is.
  if (req.url === '/greet' || path.dirname(req.url) === '/greet') {

    if (req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      var name = path.basename(req.url);
      res.write(JSON.stringify({msg: 'hello ' + name}));
      res.end();
    }
    else if (req.method === 'POST') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      var body = '';

      req.on('data', function(data) {
        body += data.toString('utf-8');
      });

      req.on('end', function(data) {
        body += data ? data.toString('utf-8') : '';
        var parsedBody;
        try {
          parsedBody = JSON.parse(body);
        } catch (e) {
          console.log(e);
          res.write(JSON.parse({msg: 'Invalid json.'}));
          return res.end();
        }
        res.write(JSON.stringify({msg: 'hello ' + parsedBody.name}));
        res.end();
      });
    }
    return;
  } //end /greet

  //We did not receive a valid request:
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'Could not find page.'}));
  res.end();
}); //end request handler

server.listen(3000, function() {
  console.log('Server started.');
});
