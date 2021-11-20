import "./App.css";
import { useState, useEffect } from "react";
import { InputMessages } from "./components/InputMessages";
import socket from "./components/Socket";
import { Messages } from "./components/Messages";
import { HomePage } from "./components/HomePage";
import { GlobalChat } from "./components/GlobalChat";
const Chance = require('chance');
const generate = new Chance();

function App() {
  const [name, setName] = useState("");
  const [userList, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      let newUser = generate.name();
      setName(newUser);
      socket.emit("newUser", newUser);
    }
    // socket.emit("usersConnected");
    // socket.on("userList", (array) => {
    //   setUsers(array);
    // });
    console.log("ENTRA");
    return () => isCancelled = true;
  }, []);

  useEffect(() => {
    socket.emit("usersConnected");
    socket.on("userList", (array) => {
      setUsers(array);
    });
  });


  useEffect(() => {
    socket.on("message_evt", (msgObject) => {
      setMessages([...messages, msgObject]);
    })
    return () => { socket.off() };
  }, []);


  
  return (
    <div className="App">
      <HomePage name={name} userlist={userList} msgs={messages}/>
      {/* {globalChat === "HomePage" &&
        <div>
          <button onClick={<ChangeScreen newPage="GlobalChat"/>}>Global Chat</button>
          <HomePage name={name} userlist={userList} messages={messages} /></div>
      }
      {/* {globalChat === "GlobalChat" && */}
        {/* <GlobalChat name={name} />
      } */} 
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



