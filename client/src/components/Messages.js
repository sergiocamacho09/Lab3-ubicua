import React, { useState, useEffect } from 'react';
import socket from './Socket';

// let messageList = [];
export function Messages(props) {
    /*That array saves all current app messages*/
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     setMessages([...messages,props.messages]);
    // },[]);

    console.log(props.messages);

    return (
        <div id="GlobalChat">
            {props.messages.map((msg, i) => {
                if (msg.name === props.name) {
                    return (
                        <div className="MyMessageContainer">
                            <div className="myMessage">
                                <p key={i}>{msg.msg}</p>
                            </div>
                        </div>

                    );
                } else {
                    return (
                        <div className="ExternalMessageContainer">
                            <div className="externalMessage">
                                <p className="userName">{msg.name}</p>
                                <p key={i}>{msg.msg}</p>
                            </div>
                        </div>

                    );
                }
            })

            }
        </div>
    );


}