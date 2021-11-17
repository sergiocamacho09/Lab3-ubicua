import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Chat } from "./components/Chat";
import socket from "./components/Socket";
const generate = require('project-name-generator');
let newUser = generate().spaced;

function App() {
 
  const [name, setName] = useState("");
  useEffect(() =>{
    setName(newUser);
    socket.emit("newUser", newUser);
  },[]);
  
  return (
    <div className="App">
      <p>Bienvenido  {name}</p>
      <Chat />
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



