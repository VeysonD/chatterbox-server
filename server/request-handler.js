
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var urlParser = require('url');


var messages = [{'username': 'sonic', 'text': 'ur 2 slow'}];
var objectId = 0;
var messagesObj = {};
messagesObj['results'] = messages;



var requestHandler = function(request, response) {
  var parts = urlParser.parse(request.url);
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (parts.pathname !== '/' && parts.pathname !== '/classes/messages' && parts.pathname !== '/chatterbox' && parts.pathname !== '/classes/room') {
    statusCode = 404;

  } else {

    if (request.method === 'OPTIONS') {
      console.log('RUNNING OPTIONS METHOD');
      console.log('response', response);
      console.log('request', request);
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(null);
      //response.end(JSON.stringify(messagesObj));
    }


    if (request.method === 'GET') {
      statusCode = 200;
      //console.log(messagesObj);

      console.log('Get');
    }



    if (request.method === 'POST') {
      statusCode = 201;
      var data = '';
      console.log('memememememe', request);
      request.on('data', (chunk) => {
        data += chunk;
      }).on('end', () => {
        var dataString = data.toString();
        var parsedData = JSON.parse(dataString);
        objectId += 1;
        parsedData['objectId'] = objectId;
        //console.log(objectId);npm te
        messages.unshift(parsedData);
        //console.log(messages);
      });

    }
  }

  response.writeHead(statusCode, headers);
  //console.log('response', response);
  response.end(JSON.stringify(messagesObj));
};

var requestMethod = function() {

};

exports.requestHandler = requestHandler;
