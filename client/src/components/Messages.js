import React, { useState, useEffect } from 'react';
import socket from './Socket';

// let messageList = [];
export function Messages({name}) {
    /*That array saves all current app messages*/
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message_evt", (msgObject) => {
            setMessages([...messages, msgObject]);
        })
        return () => { socket.off() };
    }, [messages]);

    function CheckUser() {

        // messages.map((message) => {
        //     if (message.user === props.user) {
        //         return (
        //             <div className="MyMessageContainer">
        //                 <p>{message.msg}</p>
        //             </div>
        //         );
        //     } else {
        //         return (
        //             <div className="ExternalMessageContainer">
        //                 <p>{message.msg}</p>
        //             </div>
        //         )
        //     }
        // })



        return (
            <div className="MyMessageContainer">
                {messages.name !== {name} &&
                    <div className_="externalMessage">
                        {messages.map((messages, i) => <p key={i} >{messages.msg}</p>)}
                    </div>
                }
                {messages.name === {name} &&
                    <div className="myMessage">
                        {messages.map((messages, i) => <p key={i} >{messages.msg}</p>)}
                    </div>

                }
            </div>
        );
        // } else {
        //     return (
        //         <div className="ExternalMessageContainer">
        //             {messages.map((messages, i) => <div key={i} className="externalMessage">{messages.msg}</div>)}
        //         </div>

        //     )
        // }
    }

    return (
        <div>
            <CheckUser />
        </div>
    );


}