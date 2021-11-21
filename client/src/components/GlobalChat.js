import React from "react";
import socket from "./Socket";
import { InputMessages } from "./InputMessages";
import { Messages } from "./Messages";

export function GlobalChat(props) {

    // function goHomePage(){
    //     console.log("entra");
    //     socket.emit("globalChat", "HomePage", props.name);
    // }

    return (
        <div id="GlobalChatContainer">
            <Messages name={props.name} messages={props.messages} currentPage={props.currentPage}/>
            <InputMessages name={props.name} currentPage={props.currentPage}/>
        </div>
    )
}