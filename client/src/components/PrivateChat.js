import React from "react";
import { Messages } from "./Messages";
import { InputMessages } from "./InputMessages";

export function PrivateChat(props){

    return(
        <div id="GlobalChatContainer">
            <Messages name={props.name} room={props.room} privateMessages={props.privateMessages} currentPage={props.currentPage} myId={props.myId} id={props.id}/>
            <InputMessages name={props.name} room={props.room} currentPage={props.currentPage} id={props.id} myId={props.myId}/>
        </div>
    )
}