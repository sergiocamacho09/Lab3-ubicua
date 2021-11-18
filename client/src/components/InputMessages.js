import React, { useState, useEffect } from 'react';
import socket from "./Socket";

export function InputMessages(props) {
    const [message, setMessage] = useState("");

    function handleOnClick() {
        socket.emit("message_evt", props.name, message);
        document.getElementById("Message").value = "";
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
