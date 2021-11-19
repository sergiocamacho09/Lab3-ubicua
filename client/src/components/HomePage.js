import React, { useState, useEffect } from "react";
import socket from "./Socket";
const Chance = require('chance');
const generate = new Chance();

export function HomePage() {
    const [name, setName] = useState("");
    const [userList, setUsers] = useState([]);


    useEffect(() => {
        let newUser = generate.name();
        setName(newUser);
        socket.emit("newUser", newUser);
    }, []);

    useEffect(() => {
        socket.emit("usersConnected");
        socket.on("userList", (array) => {
            setUsers(array);
        });
    })

    function globalChat(){
        socket.emit("globalChat", name);
    }
    return (
        <div id="HomePageContainer">
            <div id="Header">
                <div id="UserName">
                    {name}
                </div>
            </div>
            <div id="HomePageContent">
                <div id="GlobalChatButton">
                    <button id="GoToGlobalChat" onClick={globalChat}>Global Chat</button>
                </div>
                {userList.map((user, i) => {
                    if (user !== name) {
                        return (
                            <div className="UsersList">
                                <div className="User">
                                    <button className="PrivateChatButton">{user}</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    )
}