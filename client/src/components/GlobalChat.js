import React from "react";
import { InputMessages } from "./InputMessages";
import { Messages } from "./Messages";

export function GlobalChat(props) {

    return (
        <div id="GlobalChatContainer">
            <Messages name={props.name} messages={props.messages} currentPage={props.currentPage}/>
            <InputMessages name={props.name} currentPage={props.currentPage} />
        </div>
    )
}