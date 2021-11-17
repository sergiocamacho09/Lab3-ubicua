import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Chat } from "./components/Chat";
import socket from "./components/Socket";
const Chance = require('chance');
const generate = new Chance();

function App() {

  const [name, setName] = useState("");
  useEffect(() => {
    let newUser = generate.name();
    setName(newUser);
    socket.emit("newUser", newUser);
  }, []);

  return (
    <div className="App">
      <div id="Header">
        <div id="UserName">
          {name}
        </div>
      </div>
      <div>
        
      </div>
      <Chat name={name} />
    </div>
  );
}

export default App;
/*
const socket = io();
const button = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector("#msg");

button.addEventListener("click", function(e) {
  const text = input.value;
  //enviarselo al servidor
  socket.emit("message_evt", {msg: text});
});

socket.on("message_evt", function(message){
  msg.innerHTML = message.msg;
});
*/



