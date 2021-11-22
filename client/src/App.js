import "./App.css";
import { useState, useEffect } from "react";
import socket from "./components/Socket";
import { HomePage } from "./components/HomePage";
const Chance = require('chance');
const generate = new Chance();

function App() {
  const [name, setName] = useState("");
  const [myId, setMyId] = useState("");
  const [userList, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);

  let messagesAux = [];
  let privateMessagesAux = [];

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      let newUser = generate.name();
      setName(newUser);
      socket.emit("newUser", newUser);
    }
    socket.on("userList", (array) => {
      setUsers(array);
    });
    socket.on("message_evt", (msgObject) => {
      messagesAux.push(msgObject)
      setMessages(messagesAux);
    })
   
    return () => isCancelled = true;
  }, []);


  useEffect(() => {
    socket.emit("usersConnected");
  });

  /*LOS MENSAJES SE RECIBEN PERO NO SE IMPRIMEN*/
  useEffect(() => {
    socket.on("message_evt_private", (msgObject) => {
      privateMessagesAux.push(msgObject)
      setPrivateMessages(privateMessagesAux);
    })
    return () => { socket.off() };
  }, []);


  return (
    <div className="App">
      <HomePage name={name} userlist={userList} messages={messages} privateMessages={privateMessages} />
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



