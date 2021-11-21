import React from "react";
import { Messages } from "./Messages";
import { InputMessages } from "./InputMessages";

export function PrivateChat(props){

    return(
        <div>
            <Messages name={props.name} privateMessages={props.privateMessages} currentPage={props.currentPage} id={props.id}/>
            <InputMessages name={props.name} currentPage={props.currentPage} id={props.id}/>
        </div>
    )
}