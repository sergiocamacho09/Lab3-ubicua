import React, { useState, useEffect } from 'react';
import socket from './Socket';

// let messageList = [];
export function Messages(props) {
    /*That array saves all current app messages*/
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message_evt", (msgObject) => {
            setMessages([...messages, msgObject]);
        })
        return () => { socket.off() };
    }, [messages]);

    // function CheckUser() {

    //     // {
    //     //     messages.map((message) => {
    //     //         if (message.name === props.name) {
    //     //             return (
    //     //                 <div className="MyMessageContainer">
    //     //                     <p>{message.msg}</p>
    //     //                 </div>
    //     //             );
    //     //         } else {
    //     //             return (
    //     //                 <div className="ExternalMessageContainer">
    //     //                     <p>{message.msg}</p>
    //     //                 </div>
    //     //             )
    //     //         }
    //     //     })
    //     // }




    //     // <div className="MyMessageContainer">
    //     //     {messages.map((msg) => {
    //     //         msg.name !== props.name &&

    //     //             <div className_="externalMessage">
    //     //                 {messages.map((messages, i) => <p key={i} >{messages.msg}</p>)}
    //     //             </div>
    //     //     })}


    //     //     {messages.map((msg) => {
    //     //         msg.name === props.name &&
    //     //             <div className="myMessage">
    //     //                 {messages.map((messages, i) => <p key={i} >{messages.msg}</p>)}
    //     //             </div>
    //     //     })}
    //     // </div>

    //     // } else {
    //     //     return (
    //     //         <div className="ExternalMessageContainer">
    //     //             {messages.map((messages, i) => <div key={i} className="externalMessage">{messages.msg}</div>)}
    //     //         </div>

    //     //     )
    //     // }
    // }

    return (
        <div id="GlobalChat">
            {messages.map((msg, i) => {
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