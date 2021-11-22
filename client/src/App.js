import "./App.css";
import { useState, useEffect } from "react";
import socket from "./components/Socket";
import { HomePage } from "./components/HomePage";
const Chance = require('chance');
const generate = new Chance();

function App() {
  const [name, setName] = useState("");
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
    socket.on("message_evt_private", (msgObject) => {
      privateMessagesAux.push(msgObject)
      setPrivateMessages(privateMessagesAux);
    })
    socket.on("message_evt_private_mine", (msgObject) => {
      privateMessagesAux.push(msgObject)
      setPrivateMessages(privateMessagesAux);
    })
    return () => isCancelled = true;
  }, []);


  useEffect(() => {
    socket.emit("usersConnected");
  });

  


  return (
    <div className="App">
      <HomePage name={name} userlist={userList} messages={messages} privateMessages={privateMessages} />
    </div>
  );
}

export default App;



