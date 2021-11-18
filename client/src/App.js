import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Chat } from "./components/Chat";
import socket from "./components/Socket";
const Chance = require('chance');
const generate = new Chance();
let users = [];

let message = "";
function App() {
  const [name, setName] = useState("");
  const [userList, setUsers] = useState([]);

  useEffect(() => {
    let newUser = generate.name();
    setName(newUser);
    socket.emit("newUser", newUser);
  }, []);

  useEffect(()=>{
    
    printUsers();
  },[userList]);

  function printUsers(){
    let div = document.getElementById("GlobalMessage");
    div.innerHTML = "";
    for(var i = 0; i < userList.length; i++){
      if(userList[i] !== name){
        div.innerHTML += "<div>" + userList[i] + "</div>";
      }
    }
    console.log(userList);
  }


  function loadUsers(){
    socket.emit("usersConnected");
    socket.on("userList", (array)=>{
      users = array;
      setUsers(users);
    });
  }

  return (
    <div className="App">
      <div id="Header">
        <div id="UserName">
          {name}
        </div>
        <div id="ViewUsers">
          <button id="ToggleButton" onClick={loadUsers}>Users</button>
        </div>
      </div>
      <div id="GlobalMessage">

      </div>
      <div className="ViewMessages">

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



