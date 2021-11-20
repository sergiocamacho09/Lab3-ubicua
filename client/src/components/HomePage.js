import React, { useState, useEffect } from "react";
import { GlobalChat } from "./GlobalChat";
import { PrivateChat } from "./PrivateChat";
import socket from "./Socket";

export function HomePage(props) {
    const [globalChat, setGlobalChat] = useState("HomePage");

    function goGlobalChat() {
        setGlobalChat("GlobalChat");
    }
    function goHomePage() {
        setGlobalChat("HomePage");
    }

    function goPrivateChat() {
        setGlobalChat("PrivateChat");
    }

    return (
        <div id="HomePageContainer">
            <div id="Header">
                <div id="UserName">
                    {props.name}
                </div>
                {globalChat !== "HomePage" &&
                    <button onClick={goHomePage}>🡰</button>
                }
            </div>
            {globalChat === "HomePage" &&
                <div id="HomePageContent">
                <div id="GlobalChatButton">
                    <button id="GoToGlobalChat" onClick={ goGlobalChat}>Global Chat</button>
                </div>
                {props.userlist.map((user, i) => {
                    if (user.name !== props.name) {
                        return (
                            <div className="UsersList">
                                <div className="User">
                                    <button className="PrivateChatButton" onClick={goPrivateChat}>{user.name}</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            }
            

            {globalChat === "GlobalChat" &&

                <GlobalChat name={props.name} messages={props.msgs}/>
            }
            {globalChat === "PrivateChat" &&
                <PrivateChat />
            }

        </div>
    )
}