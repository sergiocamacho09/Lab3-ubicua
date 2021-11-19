import React, { useState, useEffect } from 'react';
import socket from "./Socket";

/*Saving the last message in order to check is empty*/
let lastMessge = "";

export function InputMessages(props) {
    const [message, setMessage] = useState("");

    function handleOnClick() {
        if (lastMessge !== "") {
            socket.emit("message_evt", props.name, message);
            document.getElementById("Message").value = "";
            lastMessge = "";
        }

    }

    function handleOnChange(e) {
        setMessage(e.target.value);
        lastMessge = e.target.value;
        console.log(lastMessge);
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
