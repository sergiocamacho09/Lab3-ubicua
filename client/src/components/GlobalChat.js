import React, { useState, useEffect } from "react";
import socket from "./Socket";
import { InputMessages } from "./InputMessages";
import { Messages } from "./Messages";

export function GlobalChat(props) {



    return (
        <div>
            <div id="Header">
                <div id="UserName">
                    {props.name}
                </div>
            </div>
            <InputMessages name={props.name} />
            <Messages name={props.name} />
        </div>
    )
}