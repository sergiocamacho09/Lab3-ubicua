import React, { useState, useRef } from "react";
import { GlobalChat } from "./GlobalChat";
import { PrivateChat } from "./PrivateChat";

export function HomePage(props) {
    const [currentView, setCurrentView] = useState("HomePage");
    const [privateChat, setPrivateChat] = useState("");
    const [myId, setMyId] = useState("");
    const [room, setRoom] = useState("");

    var userlist = props.userlist;

    function goGlobalChat() {
        setCurrentView("GlobalChat");
    }

    function goHomePage() {
        setCurrentView("HomePage");
    }

    function goPrivateChat(userId) {
        setCurrentView("PrivateChat");
        setPrivateChat(userId);
        userlist.map((user) => {
            if (user.name === props.name) {
                setMyId(user.id);
                setRoom(userId + user.id);
            }
        })
    }

    return (
        <div id="HomePageContainer">
            <div id="Header">
                <div id="UserName">
                    {props.name}
                </div>
                {currentView !== "HomePage" &&
                    <button onClick={goHomePage}>🡰</button>
                }
            </div>

            {currentView === "HomePage" &&
                <div id="HomePageContent">
                    <div id="GlobalChatButton">
                        <button id="GoToGlobalChat" onClick={goGlobalChat}>Global Chat</button>
                    </div>
                    {props.userlist.map((user, i) => {
                        if (user.name !== props.name) {
                            return (
                                <div className="UsersList">
                                    <div className="User">
                                        <button className="PrivateChatButton" onClick={() => goPrivateChat(user.id)}>{user.name}</button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            }
            {currentView === "GlobalChat" &&

                <GlobalChat name={props.name} messages={props.messages} currentPage={currentView} />
            }
            {currentView === "PrivateChat" &&
                <PrivateChat name={props.name} room={room} myId={myId} privateMessages={props.privateMessages} currentPage={currentView} id={privateChat} />
            }
        </div>
    )
}