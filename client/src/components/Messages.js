import React from 'react';

export function Messages(props) {
    /*That array saves all current app messages*/
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     setMessages([...messages,props.messages]);
    // },[]);

    return (
        <div id="GlobalChat">
            {props.currentPage === "PrivateChat" &&
                <div>
                    {props.privateMessages.map((msg, i) => {
                        if (msg.room === (props.id+props.myId) || msg.room === (props.myId+props.id)) {
                            if (msg.from === props.myId) {
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
                        }
                    })

                    }
                </div>
            }
            {props.currentPage === "GlobalChat" &&
                <div>
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
            }
        </div>
    );


}