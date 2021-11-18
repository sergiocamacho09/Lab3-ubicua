import React, { useState, useEffect } from 'react';
import socket from "./Socket";


/* Auxiliary array that contains all messages of the main chat */
let mainChat = []
export function InputMessages(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(mainChat);
    }, [mainChat]);

    function handleOnClick() {
        mainChat.push(message);
        socket.emit("message_evt",props.name, message);
        console.log(messages);
        document.getElementById("Message").value ="";
    }

    function handleOnChange(e) {
        setMessage(e.target.value);
    }

    return (
        <div className="NewMessage">
            <div id="MessageInputContainer">
                <input id="Message" onChange={handleOnChange} placeholder="Mensaje"></input>
                <button id="ButtonMessage" onClick={handleOnClick}>Enviar</button>
            </div>
        </div>
    );
}
