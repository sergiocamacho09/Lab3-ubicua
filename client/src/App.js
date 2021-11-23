import "./App.css";
import { useState, useEffect } from "react";
import socket from "./components/Socket";
import { HomePage } from "./components/HomePage";
import { Trivial } from "./components/Trivial";
const Chance = require('chance');
const generate = new Chance();

function App() {
  const [name, setName] = useState("");
  const [userList, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [timeId, setTimeId] = useState(0);
  const [trivial, setTrivial] = useState(null);
  const [possiblesAnswers, setPossiblesAnswers] = useState([]);
  const [goTrivial, setGoTrivial] = useState(false);

  let messagesAux = [];
  let privateMessagesAux = [];

  useEffect(() => {
    /*Creating a new user when he/she go into the app */
    let isCancelled = false;
    if (!isCancelled) {
      let newUser = generate.name();
      setName(newUser);
      socket.emit("newUser", newUser);
    }
    socket.on("userList", (array) => {
      setUsers(array);
    });
    /*Pushing global chat's messages */
    socket.on("message_evt", (msgObject) => {
      messagesAux.push(msgObject)
      setMessages(messagesAux);
    })
    /**External messages in private chat */
    socket.on("message_evt_private", (msgObject) => {
      privateMessagesAux.push(msgObject)
      setPrivateMessages(privateMessagesAux);
    })
    /**Mine messages in global chat */
    socket.on("message_evt_private_mine", (msgObject) => {
      privateMessagesAux.push(msgObject)
      setPrivateMessages(privateMessagesAux);
    })
    /*Event that tell us if we are going to the trivial or not*/
    socket.on("isTrivial", data => {
      setGoTrivial(data);
    })

    /*Set the trivial listener */
    socket.on("trivial", data => {
      setTrivial(data.results[0]);
      let possiblesAnswers = [];
      possiblesAnswers.push(data.results[0].correct_answer);
      for (var i = 0; i < data.results[0].incorrect_answers.length; i++) {
        possiblesAnswers.push(data.results[0].incorrect_answers[i]);
      }

      possiblesAnswers = shuffle(possiblesAnswers);
      setPossiblesAnswers(possiblesAnswers);
      setGoTrivial(true);
      /**Set a timer that disconnect the user if it does not receive an answer */
      var id = setTimeout(() => {
        alert("Has sido desconectado");
        socket.disconnect();
      }, 15000);
      setTimeId(id);
    })
    
    return () => isCancelled = true;
  }, []);

  useEffect(() => {
    socket.emit("usersConnected");
  });

  /**Shuffle possibles answers array */
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <div className="App">
      {goTrivial === false &&
        <HomePage name={name} userlist={userList} messages={messages} privateMessages={privateMessages} />
      }
      {goTrivial === true &&
        <Trivial trivial={trivial} possiblesAnswer={possiblesAnswers} timeId={timeId} />
      }
    </div>
  );
}

export default App;



