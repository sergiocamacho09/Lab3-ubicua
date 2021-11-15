const express = require('express');
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const STATIC_CHANNELS = ['global_notifications', 'global_chat'];

//app.use(express.static('www'));

io.on("connection", function(socket){
  console.log("nuevo cliente");
  socket.emit('connection',null);
});

server.listen(3000, () => console.log('server started'));
