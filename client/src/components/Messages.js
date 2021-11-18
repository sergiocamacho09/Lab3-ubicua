import React, { useState, useEffect } from 'react';
import socket from './Socket';

let messageList = [];
export function Messages(props) {
    /*That array saves all current app messages*/
    const [messages, setMessages] = useState([]);


    socket.on("message_evt", (array) => {
        messageList = array;
        setMessages(messageList);
        messageList = []
        console.log(messages);
    });

    useEffect(() => {
        printMessages();
    }, [messages]);

    function printMessages() {
        let div = document.getElementById("MessageContainer");
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].user === props.name) {
                div.innerHTML += "<div class='MyMessageContainer'><div class='myMessage'>" + messages[i].msg + "</div></div>"
            } else {
                div.innerHTML += "<div class='ExternalMessageContainer'><div class='externalMessage'>" + messages[i].msg + "</div></div>"
            }
        }
    }
    return (
        <div id="MessageContainer">

        </div>
    );


}