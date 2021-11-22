import React, { useState } from 'react';
import socket from "./Socket";

/*Saving the last message in order to check is empty*/
let lastMessge = "";

export function InputMessages(props) {
    const [message, setMessage] = useState("");

    function handleOnClick() {
        if (lastMessge !== "") {
            if(props.currentPage === "GlobalChat"){
                socket.emit("message_evt", props.name, message);
            }else if(props.currentPage === "PrivateChat"){
                socket.emit("message_evt_private", props.id, props.room, props.myId, message);
            }
            document.getElementById("Message").value = "";
            lastMessge = "";
        }
    }

    function handleOnChange(e) {
        setMessage(e.target.value);
        lastMessge = e.target.value;
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
