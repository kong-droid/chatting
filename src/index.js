const envSetup = require('./setup/env-setup.js');
const Logging = require("./setup/winston-setup.js");
const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');

envSetup();

const hostname = process.env.NODE_ENV_HOSTNAME;
const port = Number(process.env.NODE_ENV_PORT);


const server = app.listen(port, () => {
  Logging.info('Hello Socket! \t http://' + hostname  + ':' + port);
});

const io = socketIO(server);
io.on('connection', (socket) => {
  Logging.info("connect new user.. \t" + socket.id);
  // sending and receiving.
  socket.on('message', (data) => {
    Logging.info('send message: \t' + data);
    io.emit('message', { msg: data, senderId: socket.id });
  });

  // user connection lost
  socket.on('disconnect', (data) => {
    io.emit('message', { msg: `${socket.id} has left the chatroom.`, senderId: socket.id });
  });
});

app.get('/', (req, res) => {
  const realPath = path.join(path.dirname(__filename), 'index.html');
  res.sendFile(realPath);
});