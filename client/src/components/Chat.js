import React, { useState, useEffect } from 'react';
import socket from "./Socket";
export function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);


    function handleOnClick() {
        socket.emit("message_evt", { msg: message });
    }

    function handleOnChange(e) {
        setMessage(e.target.value);
    }

    return (
        <div className="NewMessage">

            <input onChange={handleOnChange} placeholder="Mensaje"></input>
            <button onClick={handleOnClick}>Enviar</button>

        </div>
    );
}
