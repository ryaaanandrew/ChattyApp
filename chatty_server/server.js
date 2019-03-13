// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast = function broadcast(msg) {
   console.log(msg);
   wss.clients.forEach(function each(client) {
       client.send(msg);
       console.log('3. message sent to each client...')
    });
  };

  ws.on('message', (data) => {
    console.log('2. message received from client')
    let parsedMessage = JSON.parse(data);
    parsedMessage.ID = uuidv1();
    wss.broadcast(JSON.stringify(parsedMessage))
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});