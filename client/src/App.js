import "./App.css";
import { useState, useEffect } from "react";
import { InputMessages } from "./components/InputMessages";
import socket from "./components/Socket";
import { Messages } from "./components/Messages";
import { HomePage } from "./components/HomePage";
import { GlobalChat } from "./components/GlobalChat";

function App() {
  const [globalChat, setGlobalChat] = useState(false);
  socket.on("inGlobalChat", (boolean, userName) => {
    setGlobalChat(boolean);
  })

  return (
    <div className="App">
      {!globalChat &&
        <HomePage />

      }
      {globalChat &&
        <GlobalChat />
      }
      {/* <div id="Header">
        <div id="UserName">
          {name}
        </div>
        <div id="UsersList">

        </div>
        <div id="ViewUsers">
          <button id="ToggleButton" onClick={loadUsers}>Users</button>
        </div>
      </div> */}
      {/* <Messages name={name}/>
      <InputMessages name={name} /> */}
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



