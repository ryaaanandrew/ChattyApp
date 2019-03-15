// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');


const PORT = 3001;
let clientsConnected = 0;

const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//establishes connection to websocket server
const wss = new SocketServer({ server });

//runs code inside as long as there is a connection to user
wss.on('connection', (ws) => {
  console.log('Client connected');

//counts the number of clients connected to ws
  clientsConnected++;
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientsConnected))
  });

  console.log('number of clients connected: ', clientsConnected)


//function to broadcast message to all clients connected to websocket
  wss.broadcast = function broadcast(msg) {
   wss.clients.forEach(function each(client) {
       client.send(msg);
    });
  };

//listens for incoming message then runs the broadcast function
  ws.on('message', (data) => {
    let parsedMessage = JSON.parse(data);
    parsedMessage.ID = uuidv1();

    if (parsedMessage.type === 'postMessage') {
      if (parsedMessage.username === '') {
        parsedMessage.username = 'Anonymous'
      }

      parsedMessage.type = 'incomingMessage';
      wss.broadcast(JSON.stringify(parsedMessage))
    } else {
      console.log('error')
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected')

    clientsConnected--;

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(clientsConnected))
    });

    console.log('number of clients connected: ', clientsConnected)
  });


});