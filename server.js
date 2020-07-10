import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';

const port = 5000;

/* Global variables */
let listingData, server;

const requestHandler = (request, response) => {
    
  const parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname == '/listings')
     {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(listingData);
      response.end();
     }

  else
     {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end("Hello Edward, you are a nice man.");
     }
};

fs.readFile('listings.json', 'utf8', (err, data) => {
   
    listingData = data;
    if (err) throw err;

    const server = http.createServer(requestHandler);
    server.listen(port, console.log(`Server listening on: http://127.0.0.1:${port}`));

});
