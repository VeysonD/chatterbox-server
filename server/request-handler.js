
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var messages = [];

var messagesObj = {};
messagesObj['results'] = messages;



var requestHandler = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
//////////

  if (request.url !== '/' && request.url !== '/classes/messages'&& request.url !== '/chatterbox') {
    statusCode = 404;

  } else {

    if (request.method === 'OPTIONS') {
      console.log('Why is this happening');
      statusCode = 200;
      response.writeHead(statusCode, headers);
      console.log('response', response);
      response.end(null);
      //response.end(JSON.stringify(messagesObj));
    }


    if (request.method === 'GET') {
      statusCode = 200;
      console.log(messagesObj);
      console.log('Get');
    }



    if (request.method === 'POST') {
      statusCode = 201;
      var data = '';
      request.on('data', (chunk) => {
        data += chunk;
      }).on('end', () => {
        var dataString = data.toString();
        var parsedData = JSON.parse(dataString);
        console.log(parsedData);
        messages.push(parsedData);
        //console.log(messages);
      });
//////

    }
  }

  response.writeHead(statusCode, headers);
  console.log('response', response);
  response.end(JSON.stringify(messagesObj));
};

var requestMethod = function() {

};

exports.requestHandler = requestHandler;
