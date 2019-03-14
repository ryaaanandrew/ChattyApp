// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


const PORT = 3001;


const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//establishes connection to websocket server
const wss = new SocketServer({ server });

//runs code inside as long as there is a connection to user
wss.on('connection', (ws) => {
  console.log('Client connected');

//function to broadcast message to all clients connected to websocket
  wss.broadcast = function broadcast(msg) {
   wss.clients.forEach(function each(client) {
       client.send(msg);
    });
  };

//listens for incoming message then runs the broadcast function
  ws.on('message', (data) => {
    let parsedMessage = JSON.parse(data);

    console.log('parsed message...', parsedMessage)

    parsedMessage.ID = uuidv1();
    wss.broadcast(JSON.stringify(parsedMessage))
  });


  ws.on('close', () => console.log('Client disconnected'));
});