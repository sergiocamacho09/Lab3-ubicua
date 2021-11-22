const express = require('express');
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let usersConnected = [];
let userObject = null;
//let messageList = [];

//app.use(express.static('www'));

io.on("connection", function (socket) {
  socket.on("newUser", (name) => {
    console.log("nuevo usuario: " + name + " en el socket " + socket.id);
    userObject = { name: name, id: socket.id };
    usersConnected.push(userObject);
    console.log(usersConnected);
  });

  socket.on("usersConnected", () => {
    socket.emit("userList", usersConnected);
  })

  socket.on("message_evt", (name, msg) => {
    //messageList.push({user: name , msg: msg});
    io.sockets.emit("message_evt", { name, msg });
  });

  socket.on("message_evt_private", (id, room, myId, msg) => {
    io.to(id).emit("message_evt_private", { room, from: myId, msg });
    io.to(myId).emit("message_evt_private_mine", { room, from: myId, msg });
  })

  socket.on("globalChat", (actualPage, name) => {
    socket.emit("inGlobalChat", actualPage, name);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado del socket: " + socket.id);
    for (var i = 0; i < usersConnected.length; i++) {
      if (usersConnected[i].id === socket.id) {
        usersConnected.splice(i, 1);
      }
    }
  })

});

server.listen(3001, () => console.log('server started'));