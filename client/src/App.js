import "./App.css";
import { useState, useEffect } from "react";
import { InputMessages } from "./components/InputMessages";
import socket from "./components/Socket";
import { Messages } from "./components/Messages";
const Chance = require('chance');
const generate = new Chance();
let users = [];

let message = "";
function App() {
  const [name, setName] = useState("");
  const [userList, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let newUser = generate.name();
    setName(newUser);
    socket.emit("newUser", newUser);
  }, []);

  /*Code used to show all the users that they are already connected*/

  useEffect(() => {
    printUsers();
  }, [userList]);

  function printUsers() {
    let div = document.getElementById("UsersList");
    if (toggle) {
      for (var i = 0; i < userList.length; i++) {
        if (userList[i] !== name) {
          div.innerHTML += "<div class='AppUser'>" + userList[i] + "</div>";
        }
      }
    } else {
      div.innerHTML = "";
    }
  }


  function loadUsers() {
    socket.emit("usersConnected");
    socket.on("userList", (array) => {
      users = array;
      setUsers(users);
    });
    setToggle((toggle) => !toggle);
  }

  return (
    <div className="App">
      <div id="Header">
        <div id="UserName">
          {name}
        </div>
        <div id="UsersList">

        </div>
        <div id="ViewUsers">
          <button id="ToggleButton" onClick={loadUsers}>Users</button>
        </div>
      </div>
      <Messages name={name}/>
      <InputMessages name={name} />
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



