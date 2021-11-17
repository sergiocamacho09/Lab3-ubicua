import React, { useState, useEffect } from 'react';
import socket from "./Socket";


/* Auxiliary array that contains all messages of the main chat */
let mainChat = []
export function Chat(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(mainChat);
    }, [mainChat]);

    function handleOnClick() {
        mainChat.push(message);
        console.log(messages);
        socket.emit("message_evt",props.name, message);
    }

    function handleOnChange(e) {
        setMessage(e.target.value);
    }

    return (
        <div className="NewMessage">
            <div id="MessageContainer">
                <input id="Message" onChange={handleOnChange} placeholder="Mensaje"></input>
                <button id="ButtonMessage" onClick={handleOnClick}>Enviar</button>
            </div>
        </div>
    );
}
