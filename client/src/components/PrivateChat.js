import React from "react";
import { Messages } from "./Messages";
import { InputMessages } from "./InputMessages";

export function PrivateChat(props){

    return(
        <div>
            <Messages name={props.name} privateMessages={props.privateMessages} currentPage={props.currentPage} myId={props.myId}/>
            <InputMessages name={props.name} currentPage={props.currentPage} id={props.id} myId={props.myId}/>
        </div>
    )
}